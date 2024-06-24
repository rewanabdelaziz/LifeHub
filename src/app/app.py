import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import pytesseract
import base64
from io import BytesIO
from PIL import Image, UnidentifiedImageError
import re
import traceback
import logging
import joblib

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:4200"}})

# If you're on Windows, specify the path to Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Load pre-trained SVM model
svm_model = joblib.load('svm_model.pkl')

def extract_patient_info(image):
    try:
        img = np.array(image)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        bin_img = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 2)
        kernel = np.ones((1, 1), np.uint8)
        img_processed = cv2.dilate(bin_img, kernel, iterations=1)
        img_processed = cv2.erode(img_processed, kernel, iterations=1)
        text = pytesseract.image_to_string(img_processed)

        value_pattern = r'(\d+(\.\d+)?)\s*(?:mg/dL|U/L|g/dL)?'
        gender_pattern = r'Gender:\s*(\w+)'

        gender_match = re.search(gender_pattern, text, re.IGNORECASE)
        if (gender_match):
            gender = gender_match.group(1)
            gender = 1 if gender.lower() == 'male' else 0
        else:
            gender = None

        values = re.findall(value_pattern, text)
        value_names = [
            'Age',
            'Total_Bilirubin',
            'Direct_Bilirubin',
            'Alkaline_Phosphotase',
            'Alamine_Aminotransferase',
            'Aspartate_Aminotransferase',
            'Total_Protiens',
            'Albumin',
            'Albumin_and_Globulin_Ratio'
        ]

        patient_data = {'Gender': gender}
        for name, value in zip(value_names, values):
            complete_value = value[0] if value else None
            numeric_value = float(complete_value) if complete_value else None
            patient_data[name] = numeric_value
        return patient_data
    except Exception as e:
        logging.error(f"Error extracting patient info: {e}")
        logging.error(traceback.format_exc())
        return None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # logging.debug(f"Received data: {data}")

        image_data = data['image']
        # logging.debug(f"Base64 Image Data: {image_data[:100]}")

        if image_data.startswith('data:image'):
            image_data = image_data.split(',')[1]

        missing_padding = len(image_data) % 4
        if missing_padding:
            image_data += '=' * (4 - missing_padding)

        try:
            decoded_image_data = base64.b64decode(image_data)
            image = Image.open(BytesIO(decoded_image_data))
        except UnidentifiedImageError as e:
            logging.error("Failed to identify image. Invalid image data.")
            return jsonify({'error': 'Invalid image data'}), 400

        patient_info = extract_patient_info(image)
        # logging.debug(f"Extracted patient info: {patient_info}")

        if patient_info and None not in patient_info.values():
            columns_order = ['Age', 'Gender', 'Total_Bilirubin', 'Direct_Bilirubin',
                            'Alkaline_Phosphotase', 'Alamine_Aminotransferase',
                            'Aspartate_Aminotransferase', 'Total_Protiens', 'Albumin',
                            'Albumin_and_Globulin_Ratio']
            patient_df = pd.DataFrame(patient_info, index=[0])[columns_order]
            # logging.debug(f"Patient DataFrame: {patient_df}")

            # Making prediction with the SVM model
            svm_prediction = svm_model.predict(patient_df)
            svm_result = "Positive outcome for patient test (likely to have the disease)" if svm_prediction[0] == 1 else "Negative outcome for patient test (unlikely to have the disease)"

            return jsonify({'svm_result': svm_result})
        else:
            logging.error("Failed to extract complete patient information")
            return jsonify({'error': 'Failed to extract complete patient information from image'}), 400

    except Exception as e:
        logging.error(f"Error in /predict endpoint: {e}")
        logging.error(traceback.format_exc())
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # logging.basicConfig(level=logging.DEBUG)
    app.run(port=5000)

# python src/app/app.py
