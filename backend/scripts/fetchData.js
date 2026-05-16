const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Categories for classification
const CATEGORIES = [
  'Artificial Intelligence',
  'Productivity',
  'Marketing',
  'Developer Tools',
  'Design',
  'SEO',
  'Chatbots',
  'Social Media',
  'Content Creation',
  'No Code',
  'Writing',
  'Customer Support',
  'Blogging',
  'Sales',
  'Productized Services',
  'Website Builders',
  'Analytics',
  'iOS',
  'Developer APIs',
  'Video',
  'Building Products',
  'Mac',
  'Feedback Tools',
  'Education',
  'Email'
];

// Keywords for category classification
const CATEGORY_KEYWORDS = {
  'Artificial Intelligence': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'neural network', 'automation'],
  'Productivity': ['productivity', 'task', 'todo', 'project management', 'calendar', 'scheduling', 'time tracking'],
  'Marketing': ['marketing', 'advertising', 'promotion', 'campaign', 'lead generation', 'email marketing'],
  'Developer Tools': ['developer', 'programming', 'coding', 'api', 'sdk', 'development', 'github', 'code'],
  'Design': ['design', 'ui', 'ux', 'graphic', 'logo', 'color', 'font', 'prototype', 'wireframe'],
  'SEO': ['seo', 'search engine optimization', 'keyword', 'ranking', 'backlink', 'serp'],
  'Chatbots': ['chatbot', 'chat', 'conversation', 'messaging', 'bot', 'virtual assistant'],
  'Social Media': ['social media', 'twitter', 'facebook', 'instagram', 'linkedin', 'social'],
  'Content Creation': ['content creation', 'writing', 'blogging', 'video creation', 'audio', 'podcast'],
  'No Code': ['no code', 'nocode', 'low code', 'drag and drop', 'visual builder'],
  'Writing': ['writing', 'editor', 'grammar', 'spell check', 'content', 'copywriting'],
  'Customer Support': ['customer support', 'help desk', 'ticketing', 'customer service', 'support'],
  'Blogging': ['blogging', 'blog', 'wordpress', 'content management', 'cms'],
  'Sales': ['sales', 'crm', 'selling', 'pipeline', 'deal', 'prospecting'],
  'Productized Services': ['productized services', 'service', 'consulting', 'freelance'],
  'Website Builders': ['website builder', 'web builder', 'site builder', 'landing page'],
  'Analytics': ['analytics', 'data analysis', 'metrics', 'reporting', 'dashboard', 'insights'],
  'iOS': ['ios', 'iphone', 'ipad', 'apple', 'mobile app'],
  'Developer APIs': ['api', 'rest', 'graphql', 'webhook', 'integration'],
  'Video': ['video', 'video editing', 'video creation', 'streaming', 'video processing'],
  'Building Products': ['product building', 'startup', 'mvp', 'product development'],
  'Mac': ['mac', 'macos', 'apple', 'desktop app'],
  'Feedback Tools': ['feedback', 'survey', 'poll', 'review', 'rating'],
  'Education': ['education', 'learning', 'course', 'tutorial', 'training', 'e-learning'],
  'Email': ['email', 'email marketing', 'newsletter', 'email automation']
};

// Function to classify tool into category based on description and name
function classifyCategory(name, description) {
  const text = `${name} ${description}`.toLowerCase();
  
  let bestCategory = 'Artificial Intelligence';
  let bestScore = 0;
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }
  
  return bestCategory;
}

// Function to extract domain from URL
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch (error) {
    return null;
  }
}

// Function to get logo URL
function getLogoUrl(domain) {
  if (!domain) return null;
  return `https://logo.clearbit.com/${domain}`;
}

// Function to get screenshot URL
function getScreenshotUrl(url) {
  if (!url) return null;
  return `https://image.thum.io/get/fullpage/${encodeURIComponent(url)}`;
}

// Fetch data from GitHub repositories
async function fetchGitHubData() {
  const repositories = [
    'https://raw.githubusercontent.com/yousefebrahimi0/1000-AI-collection-tools/main/README.md',
    'https://raw.githubusercontent.com/mahseema/awesome-ai-tools/main/README.md',
    'https://raw.githubusercontent.com/steven2358/awesome-generative-ai/main/README.md',
    'https://raw.githubusercontent.com/ai-tools-inc/awesome-ai-tools/main/README.md',
    'https://raw.githubusercontent.com/ghimiresunil/Top-AI-Tools/main/README.md',
    'https://raw.githubusercontent.com/re50urces/Awesome-AI/main/README.md',
    'https://raw.githubusercontent.com/jamesmurdza/awesome-ai-devtools/main/README.md',
    'https://raw.githubusercontent.com/nanogiants/awesome-ai-tools/main/README.md',
    'https://raw.githubusercontent.com/ParthaPRay/Curated-List-of-Generative-AI-Tools/main/README.md',
    'https://raw.githubusercontent.com/e2b-dev/awesome-ai-agents/main/README.md'
  ];

  const tools = [];
  
  for (const repo of repositories) {
    try {
      console.log(`Fetching from: ${repo}`);
      const response = await axios.get(repo);
      const content = response.data;
      
      // Parse markdown content to extract tools
      const parsedTools = parseMarkdownTools(content, repo);
      tools.push(...parsedTools);
      
      console.log(`Extracted ${parsedTools.length} tools from ${repo}`);
    } catch (error) {
      console.error(`Error fetching from ${repo}:`, error.message);
    }
  }
  
  return tools;
}

// Parse markdown content to extract tools
function parseMarkdownTools(content, source) {
  const tools = [];
  const lines = content.split('\n');
  
  let currentCategory = 'Artificial Intelligence';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for category headers
    if (line.startsWith('##') || line.startsWith('###')) {
      const headerText = line.replace(/^#+\s*/, '').toLowerCase();
      for (const category of CATEGORIES) {
        if (headerText.includes(category.toLowerCase())) {
          currentCategory = category;
          break;
        }
      }
    }
    
    // Look for tool entries (markdown links)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [...line.matchAll(linkRegex)];
    
    for (const match of matches) {
      const name = match[1].trim();
      const url = match[2].trim();
      
      // Skip if not a valid URL or if it's an internal link
      if (!url.startsWith('http') || url.includes('github.com')) {
        continue;
      }
      
      // Try to extract description from the same line
      let description = '';
      const afterLink = line.substring(match.index + match[0].length).trim();
      if (afterLink && afterLink !== '-') {
        description = afterLink.replace(/^[-–—]\s*/, '').trim();
      }
      
      // If no description, look at the next line
      if (!description && i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (nextLine && !nextLine.startsWith('#') && !nextLine.includes('[')) {
          description = nextLine.replace(/^[-–—]\s*/, '').trim();
        }
      }
      
      // If still no description, use a generic one
      if (!description) {
        description = `AI tool for ${currentCategory.toLowerCase()}`;
      }
      
      const tool = {
        name: name,
        description: description,
        website: url,
        category: currentCategory,
        tags: [],
        logo: getLogoUrl(extractDomain(url)),
        screenshot: getScreenshotUrl(url),
        popularity: Math.floor(Math.random() * 1000) + 1,
        featured: false,
        deals: Math.random() > 0.9, // 10% chance of having deals
        source: source
      };
      
      tools.push(tool);
    }
  }
  
  return tools;
}

// Fetch additional data from web sources
async function fetchWebData() {
  const sources = [
    {
      name: 'Toolify',
      url: 'https://www.toolify.ai/tools',
      selector: '.tool-item'
    },
    {
      name: 'Futurepedia',
      url: 'https://www.futurepedia.io/tools',
      selector: '.tool-card'
    },
    {
      name: 'There\'s An AI For That',
      url: 'https://www.theresanaiforthat.com/tools',
      selector: '.tool'
    }
  ];
  
  const tools = [];
  
  for (const source of sources) {
    try {
      console.log(`Fetching from web: ${source.name}`);
      const response = await axios.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      const elements = $(source.selector);
      
      elements.each((index, element) => {
        const $el = $(element);
        const name = $el.find('h3, .tool-name, .title').text().trim();
        const description = $el.find('.description, .tool-description, p').text().trim();
        const link = $el.find('a').attr('href');
        
        if (name && link && description) {
          const fullUrl = link.startsWith('http') ? link : `https://${source.url.split('/')[2]}${link}`;
          
          const tool = {
            name: name,
            description: description,
            website: fullUrl,
            category: classifyCategory(name, description),
            tags: [],
            logo: getLogoUrl(extractDomain(fullUrl)),
            screenshot: getScreenshotUrl(fullUrl),
            popularity: Math.floor(Math.random() * 1000) + 1,
            featured: false,
            deals: Math.random() > 0.9,
            source: source.name
          };
          
          tools.push(tool);
        }
      });
      
      console.log(`Extracted ${elements.length} tools from ${source.name}`);
    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error.message);
    }
  }
  
  return tools;
}

// Generate sample data if we don't have enough tools
function generateSampleData(count = 1000) {
  const sampleTools = [];
  const sampleNames = [
    'ChatGPT', 'Midjourney', 'DALL-E', 'Claude', 'Gemini', 'Copilot', 'Stable Diffusion',
    'Runway', 'Descript', 'Jasper', 'Copy.ai', 'Grammarly', 'Notion AI', 'Canva AI',
    'Framer AI', 'Replit AI', 'GitHub Copilot', 'Tabnine', 'CodeT5', 'CodeLlama',
    'Hugging Face', 'Pinecone', 'LangChain', 'AutoGPT', 'BabyAGI', 'AgentGPT',
    'Character.AI', 'Replika', 'Cleverbot', 'Tidio', 'Intercom', 'Zendesk AI',
    'Salesforce Einstein', 'HubSpot AI', 'Marketo AI', 'AdCreative.ai', 'Copy.ai',
    'Jasper.ai', 'Rytr', 'Writesonic', 'Article Forge', 'Frase.io', 'SurferSEO',
    'Ahrefs AI', 'SEMrush AI', 'Moz AI', 'Ubersuggest AI', 'AnswerThePublic AI',
    'BuzzSumo AI', 'Sprout Social AI', 'Hootsuite AI', 'Buffer AI', 'Later AI',
    'Loom AI', 'Descript AI', 'Otter.ai', 'Fireflies.ai', 'Krisp.ai', 'NoiseGator',
    'Miro AI', 'Figma AI', 'Sketch AI', 'Adobe Firefly', 'Canva AI', 'Designs.ai',
    'Logo.com AI', 'Looka AI', 'Brandmark.io AI', 'Tailor Brands AI', 'Namecheap AI',
    'Wix ADI', 'Squarespace AI', 'Webflow AI', 'Framer AI', 'Bubble AI', 'Adalo AI',
    'Glide AI', 'Softr AI', 'Pory AI', 'Stacker AI', 'Gadget AI', 'Retool AI',
    'Appsmith AI', 'Budibase AI', 'Tooljet AI', 'Illa Builder AI', 'AppGyver AI',
    'OutSystems AI', 'Mendix AI', 'Salesforce Platform AI', 'Microsoft Power Apps AI',
    'Google AppSheet AI', 'Zoho Creator AI', 'QuickBase AI', 'FileMaker AI', 'Airtable AI',
    'Notion AI', 'Coda AI', 'Craft.do AI', 'Obsidian AI', 'Roam Research AI',
    'Logseq AI', 'RemNote AI', 'Anki AI', 'Quizlet AI', 'Khan Academy AI',
    'Coursera AI', 'edX AI', 'Udemy AI', 'Skillshare AI', 'MasterClass AI',
    'Duolingo AI', 'Babbel AI', 'Rosetta Stone AI', 'Memrise AI', 'Busuu AI'
  ];
  
  const sampleDescriptions = [
    'AI-powered tool for content creation and automation',
    'Machine learning platform for data analysis',
    'Natural language processing for text generation',
    'Computer vision tool for image recognition',
    'Predictive analytics for business intelligence',
    'Automated workflow management system',
    'AI-driven customer service platform',
    'Intelligent project management solution',
    'Smart email marketing automation',
    'Advanced SEO optimization tool',
    'AI-powered design and creativity platform',
    'Intelligent code generation and assistance',
    'Automated testing and quality assurance',
    'Smart data visualization and reporting',
    'AI-enhanced collaboration and communication'
  ];
  
  for (let i = 0; i < count; i++) {
    const name = sampleNames[i % sampleNames.length] + (i >= sampleNames.length ? ` ${Math.floor(i / sampleNames.length) + 1}` : '');
    const description = sampleDescriptions[i % sampleDescriptions.length];
    const category = CATEGORIES[i % CATEGORIES.length];
    
    const tool = {
      name: name,
      description: description,
      website: `https://www.${name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`,
      category: category,
      tags: [category.toLowerCase().replace(/\s+/g, '-'), 'ai', 'automation'],
      logo: getLogoUrl(extractDomain(`https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`)),
      screenshot: getScreenshotUrl(`https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`),
      popularity: Math.floor(Math.random() * 1000) + 1,
      featured: i < 50, // First 50 tools are featured
      deals: i % 10 === 0, // Every 10th tool has deals
      source: 'Generated'
    };
    
    sampleTools.push(tool);
  }
  
  return sampleTools;
}

// Main function to fetch all data
async function fetchAllData() {
  console.log('Starting data fetch...');
  
  let allTools = [];
  
  try {
    // Fetch from GitHub repositories
    const githubTools = await fetchGitHubData();
    allTools.push(...githubTools);
    console.log(`Fetched ${githubTools.length} tools from GitHub repositories`);
    
    // Fetch from web sources
    const webTools = await fetchWebData();
    allTools.push(...webTools);
    console.log(`Fetched ${webTools.length} tools from web sources`);
    
    // Remove duplicates based on website URL
    const uniqueTools = [];
    const seenUrls = new Set();
    
    for (const tool of allTools) {
      if (!seenUrls.has(tool.website)) {
        seenUrls.add(tool.website);
        uniqueTools.push(tool);
      }
    }
    
    console.log(`After deduplication: ${uniqueTools.length} unique tools`);
    
    // If we don't have enough tools, generate sample data
    if (uniqueTools.length < 1000) {
      const needed = 1000 - uniqueTools.length;
      console.log(`Generating ${needed} sample tools to reach 1000 total`);
      const sampleTools = generateSampleData(needed);
      uniqueTools.push(...sampleTools);
    }
    
    // Save to file
    const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(uniqueTools.slice(0, 1000), null, 2));
    
    console.log(`Successfully saved ${uniqueTools.length} tools to ${outputPath}`);
    
    return uniqueTools.slice(0, 1000);
    
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Fallback to generated data
    console.log('Falling back to generated data...');
    const fallbackTools = generateSampleData(1000);
    const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(fallbackTools, null, 2));
    
    return fallbackTools;
  }
}

// Run the function if this file is executed directly
if (require.main === module) {
  fetchAllData().then(tools => {
    console.log(`Data fetch complete! Total tools: ${tools.length}`);
    process.exit(0);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { fetchAllData, classifyCategory, extractDomain };
