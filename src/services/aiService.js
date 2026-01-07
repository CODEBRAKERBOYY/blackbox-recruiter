import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

// Extract text from PDF
export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(arrayBuffer);
    
    // Basic PDF text extraction
    const matches = text.match(/\/T\s*\((.*?)\)/g);
    if (matches && matches.length > 0) {
      return matches.map(m => m.replace(/\/T\s*\(|\)/g, '')).join(' ');
    }
    
    throw new Error('Could not extract text from PDF. Please use TXT file or paste text directly.');
    
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('PDF parsing failed. Please use TXT file or paste resume text.');
  }
}

// Extract text from any file type
export async function extractTextFromFile(file) {
  if (file.type === 'application/pdf') {
    return await extractTextFromPDF(file);
  } else if (file.type === 'text/plain') {
    return await file.text();
  } else {
    throw new Error('Unsupported file type. Please upload PDF or TXT file.');
  }
}

// Match Analysis
export async function analyzeResume(resumeText, jobDescription) {
  try {
    const prompt = `You are an expert resume analyzer and career coach. Analyze this resume against the job description and provide detailed insights.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide your analysis in the following JSON format (respond ONLY with valid JSON, no markdown):
{
  "matchScore": <number 0-100>,
  "strengths": [<array of 3-5 key strengths from resume that match job>],
  "gaps": [<array of 2-4 missing qualifications or areas to improve>],
  "recommendations": [<array of 3-5 specific actionable recommendations>]
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const response = completion.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    const jsonText = response.replace(/```json\n?|\n?```/g, '').trim();
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('Failed to analyze resume. Please try again.');
  }
}

// ATS Analysis
export async function analyzeATS(resumeText, jobDescription) {
  try {
    const prompt = `You are an ATS (Applicant Tracking System) expert and recruiter. Analyze this resume for ATS compatibility and provide detailed optimization suggestions.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide your analysis in the following JSON format (respond ONLY with valid JSON, no markdown):
{
  "atsScore": <number 0-100>,
  "keywordMatch": <number 0-100>,
  "missingKeywords": [<array of 5-8 critical keywords missing from resume>],
  "foundKeywords": [<array of 5-8 important keywords found in resume>],
  "formattingIssues": [<array of 2-4 ATS formatting problems>],
  "optimizationTips": [<array of 4-6 specific actionable tips to improve ATS score>],
  "rewriteSuggestions": [
    {
      "original": "<weak bullet point from resume>",
      "improved": "<ATS-optimized version with keywords and metrics>"
    }
  ]
}

Focus on:
- Exact keyword matches from job description
- Action verbs and quantifiable achievements
- ATS-friendly formatting (no tables, graphics, columns)
- Industry-specific terminology
- Hard skills and technical requirements`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 2048,
    });

    const response = completion.choices[0].message.content.trim();
    const jsonText = response.replace(/```json\n?|\n?```/g, '').trim();
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('ATS Analysis Error:', error);
    throw new Error('Failed to analyze ATS compatibility. Please try again.');
  }
}