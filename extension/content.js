
// PersonaPulse Content Script - Detects usernames and shows persona cards
class PersonaPulseDetector {
  constructor() {
    this.apiUrl = 'https://your-icp-backend.com/api'; // Replace with actual backend URL
    this.detectedUsers = new Set();
    this.init();
  }

  init() {
    console.log('PersonaPulse: Initializing on', window.location.hostname);
    this.scanForUsernames();
    
    // Re-scan when page content changes (for SPAs)
    const observer = new MutationObserver(() => {
      this.debounce(() => this.scanForUsernames(), 1000)();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  scanForUsernames() {
    const selectors = this.getUsernameSelectors();
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => this.processElement(element));
    });
  }

  getUsernameSelectors() {
    const hostname = window.location.hostname;
    
    // Define selectors for different platforms
    const selectorMap = {
      'fiverr.com': [
        '[data-username]',
        '.username',
        '.seller-name',
        'h1[data-impression-collected]',
        '.profile-card-name',
        '.gig-seller-name'
      ],
      'upwork.com': [
        '[data-test="FreelancerName"]',
        '.freelancer-name',
        '.profile-name',
        'h1[data-test="up-c-line-clamp"]',
        '.identity-name'
      ],
      'freelancer.com': [
        '.username',
        '.freelancer-link',
        '.profile-name',
        'h1.profile-username',
        '.user-profile-name'
      ],
      '99designs.com': [
        '.designer-name',
        '.profile-name',
        'h1.designer-title'
      ],
      'guru.com': [
        '.freelancer-name',
        '.profile-name',
        'h1.profile-header-name'
      ],
      'peopleperhour.com': [
        '.seller-name',
        '.profile-name',
        'h1.profile-title'
      ]
    };

    // Return selectors for current platform or generic ones
    return selectorMap[hostname] || [
      '.username', '.user-name', '.profile-name', 
      '.seller-name', '.freelancer-name', '.designer-name'
    ];
  }

  async processElement(element) {
    const username = this.extractUsername(element);
    if (!username || this.detectedUsers.has(username)) return;

    this.detectedUsers.add(username);
    
    try {
      const personaData = await this.checkPersonaExists(username);
      if (personaData) {
        this.addPersonaButton(element, personaData);
      }
    } catch (error) {
      console.error('PersonaPulse: Error checking persona:', error);
    }
  }

  extractUsername(element) {
    // Try different methods to extract username
    const username = element.textContent?.trim() ||
                    element.getAttribute('data-username') ||
                    element.getAttribute('data-test') ||
                    element.innerText?.trim();
    
    return username?.replace(/[@#]/g, '').toLowerCase();
  }

  async checkPersonaExists(username) {
    try {
      // Mock API call - replace with actual ICP backend call
      const response = await fetch(`${this.apiUrl}/persona/check/${username}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      // Fallback to mock data for development
      return this.getMockPersonaData(username);
    }
    return null;
  }

  getMockPersonaData(username) {
    // Mock data for development - remove in production
    const mockUsers = {
      'sarah_designer': {
        name: 'Sarah Designer',
        username: 'sarah_designer',
        bio: 'Creative designer with 5+ years of experience',
        skills: ['Brand Design', 'Web Design', 'Mobile UI/UX'],
        rating: 4.9,
        reviews: 89,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
      },
      'john_dev': {
        name: 'John Developer',
        username: 'john_dev',
        bio: 'Full-stack developer specializing in React and Node.js',
        skills: ['React', 'Node.js', 'TypeScript'],
        rating: 4.8,
        reviews: 156,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
      }
    };
    
    return mockUsers[username] || null;
  }

  addPersonaButton(element, personaData) {
    // Create persona button
    const button = document.createElement('div');
    button.className = 'persona-pulse-button';
    button.innerHTML = `
      <div class="persona-pulse-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      </div>
    `;
    
    // Position button relative to the element
    button.style.position = 'absolute';
    button.style.zIndex = '10000';
    
    // Create persona card
    const card = this.createPersonaCard(personaData);
    
    // Add hover events
    let hoverTimeout;
    
    button.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      this.showPersonaCard(card, button);
    });
    
    button.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        this.hidePersonaCard(card);
      }, 300);
    });
    
    card.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
    });
    
    card.addEventListener('mouseleave', () => {
      this.hidePersonaCard(card);
    });
    
    // Position and insert button
    this.positionButton(button, element);
    document.body.appendChild(button);
    document.body.appendChild(card);
  }

  positionButton(button, element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    button.style.left = `${rect.right + scrollLeft + 5}px`;
    button.style.top = `${rect.top + scrollTop}px`;
  }

  createPersonaCard(personaData) {
    const card = document.createElement('div');
    card.className = 'persona-pulse-card';
    card.style.display = 'none';
    
    card.innerHTML = `
      <div class="persona-pulse-card-content">
        <div class="persona-pulse-header">
          <img src="${personaData.profileImage}" alt="${personaData.name}" class="persona-pulse-avatar">
          <div class="persona-pulse-info">
            <h3 class="persona-pulse-name">${personaData.name}</h3>
            <p class="persona-pulse-username">@${personaData.username}</p>
          </div>
          <div class="persona-pulse-verified">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="9"/>
            </svg>
          </div>
        </div>
        
        <div class="persona-pulse-bio">
          <p>${personaData.bio}</p>
        </div>
        
        <div class="persona-pulse-skills">
          ${personaData.skills.map(skill => `<span class="persona-pulse-skill">${skill}</span>`).join('')}
        </div>
        
        <div class="persona-pulse-stats">
          <div class="persona-pulse-stat">
            <span class="persona-pulse-stat-value">${personaData.rating}</span>
            <span class="persona-pulse-stat-label">Rating</span>
          </div>
          <div class="persona-pulse-stat">
            <span class="persona-pulse-stat-value">${personaData.reviews}</span>
            <span class="persona-pulse-stat-label">Reviews</span>
          </div>
        </div>
        
        <div class="persona-pulse-actions">
          <a href="https://personapulse.com/persona/${personaData.username}" target="_blank" class="persona-pulse-view-profile">
            View Full Profile
          </a>
        </div>
      </div>
    `;
    
    return card;
  }

  showPersonaCard(card, button) {
    const buttonRect = button.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    card.style.position = 'absolute';
    card.style.left = `${buttonRect.right + scrollLeft + 10}px`;
    card.style.top = `${buttonRect.top + scrollTop}px`;
    card.style.display = 'block';
    card.style.zIndex = '10001';
    
    // Adjust position if card goes off screen
    setTimeout(() => {
      const cardRect = card.getBoundingClientRect();
      if (cardRect.right > window.innerWidth) {
        card.style.left = `${buttonRect.left + scrollLeft - cardRect.width - 10}px`;
      }
      if (cardRect.bottom > window.innerHeight) {
        card.style.top = `${buttonRect.bottom + scrollTop - cardRect.height}px`;
      }
    }, 0);
  }

  hidePersonaCard(card) {
    card.style.display = 'none';
  }
}

// Initialize the detector when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PersonaPulseDetector();
  });
} else {
  new PersonaPulseDetector();
}
