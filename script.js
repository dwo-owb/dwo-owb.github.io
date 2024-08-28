function submitForm() {
    const form = document.getElementById('quizSurveyForm');
    const formData = new FormData(form);
    
    // Scores for quiz dimensions (e.g., anxiety, avoidance)
    let anxietyScore = 0;
    let avoidanceScore = 0;
    
    // Arrays to store survey responses
    let surveyResponses = [];

    // Identify quiz and survey questions
    const quizQuestions = {
        anxiety: ['q2','q4','q6','q8','q10','q12','q14','q16','q18','q20','q22','q24','q26','q28','q30','q32','q34','q36' /* add more anxiety question ids */],
        avoidance: ['q1','q3','q5','q7','q9','q11','q13','q15','q17','q19','q21','q23','q25','q27','q29','q31','q33','q35' /* add more avoidance question ids */]
    };

    formData.forEach((value, key) => {
        // Quiz logic
        value = parseInt(value);
        if (quizQuestions.anxiety.includes(key)) {
            anxietyScore += value;
        } else if (quizQuestions.avoidance.includes(key)) {
            avoidanceScore += value;
        }
        
        // Survey logic
        if (key.startsWith('s')) {
            surveyResponses.push({ question: key, answer: value });
        }
    });

    // Normalize the quiz scores
    const normalizedAnxietyScore = anxietyScore / quizQuestions.anxiety.length;
    const normalizedAvoidanceScore = avoidanceScore / quizQuestions.avoidance.length;

    // Determine the attachment style based on quiz scores
    let attachmentStyle = '';
    if (normalizedAnxietyScore > 3 && normalizedAvoidanceScore > 3) {
        attachmentStyle = 'Fearful-Avoidant';
    } else if (normalizedAnxietyScore > 3) {
        attachmentStyle = 'Anxious-Preoccupied';
    } else if (normalizedAvoidanceScore > 3) {
        attachmentStyle = 'Dismissive-Avoidant';
    } else {
        attachmentStyle = 'Secure';
    }

    // Display quiz results
    document.getElementById('quizResultText').innerText = `Your attachment style is: ${attachmentStyle}`;
    
    // Display survey results
    let surveyResultsText = "Your survey responses:\n";
    surveyResponses.forEach(response => {
        surveyResultsText += `${response.question}: ${response.answer}\n`;
    });
    document.getElementById('surveyResults').innerText = surveyResultsText;

    // Show results section
    document.getElementById('results').style.display = 'block';
}
