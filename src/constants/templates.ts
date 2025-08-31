export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "summary-example",
    label: "full-document-summary-example",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>How generative AI works</h1><p>In general, generative AI operates in three phases:</p><ul><li><strong>Training</strong>, to create a foundation model.</li><li><strong>Tuning</strong>, to adapt the model to a specific application.</li><li><strong>Generation, evaluation and more tuning</strong>, to improve accuracy.</li></ul><h2>Training</h2><p>Generative AI begins with a \"foundation model\"; a deep learning model that serves as the basis for multiple different types of generative AI applications.The most common foundation models today are large language models (LLMs), created for text generation applications. But there are also foundation models for image, video, sound or music generation, and multimodal foundation models that support several kinds of content.To create a foundation model, practitioners train a deep learning algorithm on huge volumes of relevant raw, unstructured, unlabeled data, such as terabytes or petabytes of data text or images or video from the internet. The training yields a neural network of billions of parameters encoded representations of the entities, patterns and relationships in the data that can generate content autonomously in response to prompts. This is the foundation model.This training process is compute-intensive, time-consuming and expensive. It requires thousands of clustered graphics processing units (GPUs) and weeks of processing, all of which typically costs millions of dollars. Open source foundation model projects, such as Meta's Llama-2, enable gen AI developers to avoid this step and its costs.</p><h2>Tuning</h2><p>Next, the model must be tuned to a specific content generation task. This can be done in various ways, including:<strong>Fine-tuning</strong>, which involves feeding the model application-specific labeled data, questions or prompts the application is likely to receive, and corresponding correct answers in the wanted format.<strong>Reinforcement learning with human feedback (RLHF)</strong>, in which human users evaluate the accuracy or relevance of model outputs so that the model can improve itself. This can be as simple as having people type or talk back corrections to a chatbot or virtual assistant.</p><h2>Generation, evaluation and more tuning</h2><p>Developers and users regularly assess the outputs of their generative AI apps, and further tune the model even as often as once a week for greater accuracy or relevance. In contrast, the foundation model itself is updated much less frequently, perhaps every year or 18 months.Another option for improving a gen AI app's performance is retrieval augmented generation (RAG), a technique for extending the foundation model to use relevant sources outside of the training data to refine the parameters for greater accuracy or relevance.</p>
    `
  },
  {
    id: "project-proposal",
    label: "Project proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Executive Summary</h2>
      <p>Brief overview of the project proposal.</p>
      
      <h2>Project Goals</h2>
      <p>Key objectives and expected outcomes.</p>
      
      <h2>Implementation Plan</h2>
      <p>Strategy and methodology for project execution.</p>
      
      <h2>Resources Required</h2>
      <p>Team, equipment, and budget requirements.</p>
    `,
  },
  {
    id: "business-letter",
    label: "Business letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <h1>Business Letter</h1>
      <p>This is a business letter template.</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <p>[Contact Information]</p>
      
      <h2>Professional Summary</h2>
      <p>Brief overview of your professional background and key strengths.</p>
      
      <h2>Work Experience</h2>
      <p>[Company Name] - [Position]<br>
      [Date Range]</p>
      
      <h2>Education</h2>
      <p>[Degree] - [Institution]<br>
      [Graduation Year]</p>
      
      <h2>Skills</h2>
      <p>List of relevant skills and competencies.</p>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <p>[Your Name]<br>
      [Your Address]<br>
      [City, State ZIP]</p>
      
      <p>[Date]</p>
      
      <p>[Recipient's Name]<br>
      [Company Name]<br>
      [Company Address]</p>
      
      <p>Dear [Recipient's Name],</p>
      
      <p>I am writing to express my interest in [position] at [company name].</p>
      
      <p>Sincerely,<br>
      [Your Name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <p>Subject: [Email Subject]</p>
      
      <p>Dear [Recipient],</p>
      
      <p>I hope this email finds you well.</p>
      
      <p>[Email Body]</p>
      
      <p>Best regards,<br>
      [Your Name]</p>
    `,
  },
];