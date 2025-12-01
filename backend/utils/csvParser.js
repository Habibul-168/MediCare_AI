const fs = require('fs');
const path = require('path');

const parseCSV = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim().replace(/\r/g, ''));
  
  return lines.slice(1).map(line => {
    const regex = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;
    const values = line.split(regex);
    const obj = {};
    headers.forEach((header, index) => {
      let value = values[index] ? values[index].trim().replace(/\r/g, '').replace(/^"|"$/g, '') : '';
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value.replace(/'/g, '"'));
        } catch (e) {
          value = [value];
        }
      }
      obj[header] = value;
    });
    return obj;
  });
};

const loadMedicalData = () => {
  const dataPath = path.join(__dirname, '../../Datasets');
  
  const symptoms = parseCSV(path.join(dataPath, 'symtoms_df.csv'));
  const descriptions = parseCSV(path.join(dataPath, 'description.csv'));
  const medications = parseCSV(path.join(dataPath, 'medications.csv'));
  const precautions = parseCSV(path.join(dataPath, 'precautions_df.csv'));
  const diets = parseCSV(path.join(dataPath, 'diets.csv'));
  
  const diseaseMap = {};
  
  descriptions.forEach(desc => {
    const disease = desc.Disease;
    diseaseMap[disease] = {
      description: desc.Description,
      symptoms: [],
      medications: [],
      precautions: [],
      diet: []
    };
  });
  
  symptoms.forEach(symptom => {
    const disease = symptom.Disease;
    if (diseaseMap[disease]) {
      const symptomList = [
        symptom.Symptom_1,
        symptom.Symptom_2,
        symptom.Symptom_3,
        symptom.Symptom_4
      ].filter(s => s && s.trim());
      
      symptomList.forEach(s => {
        if (!diseaseMap[disease].symptoms.includes(s)) {
          diseaseMap[disease].symptoms.push(s);
        }
      });
    }
  });
  
  medications.forEach(med => {
    const disease = med.Disease;
    if (diseaseMap[disease]) {
      const meds = med.Medication;
      diseaseMap[disease].medications = Array.isArray(meds) ? meds : [meds];
    }
  });
  
  precautions.forEach(prec => {
    const disease = prec.Disease;
    if (diseaseMap[disease]) {
      diseaseMap[disease].precautions = [
        prec.Precaution_1,
        prec.Precaution_2,
        prec.Precaution_3,
        prec.Precaution_4
      ].filter(p => p && p.trim());
    }
  });
  
  diets.forEach(diet => {
    const disease = diet.Disease;
    if (diseaseMap[disease]) {
      const dietData = diet.Diet;
      diseaseMap[disease].diet = Array.isArray(dietData) ? dietData : [dietData];
    }
  });
  
  return { diseaseMap, symptoms };
};

const analyzeSymptomsFromData = (userSymptoms) => {
  try {
    const { diseaseMap, symptoms } = loadMedicalData();
    const normalizedUserSymptoms = userSymptoms.map(s => s.toLowerCase().trim().replace(/ /g, '_'));
    
    const diseaseScores = {};
    
    symptoms.forEach(entry => {
      const disease = entry.Disease;
      if (!disease) return;
      
      const diseaseSymptoms = [
        entry.Symptom_1,
        entry.Symptom_2,
        entry.Symptom_3,
        entry.Symptom_4
      ].filter(s => s && s.trim()).map(s => s.toLowerCase().trim());
      
      let matchCount = 0;
      diseaseSymptoms.forEach(ds => {
        if (normalizedUserSymptoms.some(us => ds.includes(us) || us.includes(ds))) {
          matchCount++;
        }
      });
      
      if (matchCount > 0) {
        diseaseScores[disease] = (diseaseScores[disease] || 0) + matchCount;
      }
    });
    
    const sortedDiseases = Object.entries(diseaseScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    
    if (sortedDiseases.length === 0) {
      return [{
        disease: 'General Condition',
        confidence: 50,
        data: {
          description: 'Unable to determine specific condition. Please consult a doctor.',
          medications: ['Consult a healthcare professional'],
          precautions: ['Seek medical advice', 'Monitor symptoms'],
          diet: ['Maintain balanced diet', 'Stay hydrated']
        }
      }];
    }
    
    return sortedDiseases.map(([disease, score]) => ({
      disease,
      confidence: Math.min((score / normalizedUserSymptoms.length) * 100, 95),
      data: diseaseMap[disease] || {
        description: disease,
        medications: [],
        precautions: [],
        diet: []
      }
    }));
  } catch (error) {
    console.error('Error in analyzeSymptomsFromData:', error);
    throw error;
  }
};

module.exports = { loadMedicalData, analyzeSymptomsFromData };
