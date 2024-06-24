import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import GradientBoostingClassifier
from imblearn.over_sampling import SMOTE
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer
from sklearn.svm import SVC
import joblib

# Load the dataset
patients = pd.read_csv('src\\app\indian_liver_patient.csv')

# Preprocessing
# Convert 'Gender' to binary
patients['Gender'] = patients['Gender'].apply(lambda x: 1 if x == 'Male' else 0)

# Handling missing values in 'Albumin_and_Globulin_Ratio' using MICE
imputer = IterativeImputer(random_state=42)
patients[['Albumin_and_Globulin_Ratio']] = imputer.fit_transform(patients[['Albumin_and_Globulin_Ratio']])

# Define features and target
X = patients.drop(['Dataset'], axis=1)
y = patients['Dataset']

# Splitting the data into training and testing sets with balanced classes using SMOTE
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.3, random_state=42)

# Define Gradient Boosting classifier and parameters for Grid Search
gb = GradientBoostingClassifier(random_state=42)
gb_params = {'n_estimators': [100, 200], 'learning_rate': [0.1, 0.2], 'max_depth': [3, 5]}

# Grid Search for Gradient Boosting
gb_grid = GridSearchCV(gb, gb_params, cv=5, scoring='accuracy')
gb_grid.fit(X_train, y_train)

# Save Gradient Boosting model
joblib.dump(gb_grid.best_estimator_, 'gb_model.pkl')

# Define SVM and parameters for Grid Search
svm = SVC(random_state=42, probability=True)
svm_params = {'C': [0.1, 1, 10], 'kernel': ['linear', 'rbf'], 'gamma': ['scale', 'auto']}

# Grid Search for SVM
svm_grid = GridSearchCV(svm, svm_params, cv=5, scoring='accuracy')
svm_grid.fit(X_train, y_train)

# Save SVM model
joblib.dump(svm_grid.best_estimator_, 'svm_model.pkl')

print("Models trained and saved successfully.")

# python src/app/train_model.py
