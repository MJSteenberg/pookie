// Store all selections
let dateData = {
    response: '',
    foods: [],
    drink: '',
    dessert: '',
    activity: '',
    timestamp: new Date().toISOString()
};

// Current page tracking
let currentPage = 1;

// Handle initial date response
function handleDateResponse(response) {
    dateData.response = response;
    showPage(2);
    
    // Add some celebration effects for positive responses
    if (response !== 'Let me check my schedule') {
        createHearts();
    }
}

// Create floating hearts animation
function createHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'floatUp 3s ease-out forwards';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Show specific page
function showPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page${pageNumber}`).classList.add('active');
    currentPage = pageNumber;
    window.scrollTo(0, 0);
}

// Go to next page
function nextPage() {
    if (currentPage < 7) {
        showPage(currentPage + 1);
    }
}

// Food selection handler (max 2)
document.querySelectorAll('.food-grid .option-card').forEach(card => {
    card.addEventListener('click', function() {
        const food = this.dataset.food;
        const isSelected = this.classList.contains('selected');
        
        if (isSelected) {
            this.classList.remove('selected');
            dateData.foods = dateData.foods.filter(f => f !== food);
        } else {
            if (dateData.foods.length < 2) {
                this.classList.add('selected');
                dateData.foods.push(food);
            } else {
                // Show message that they can only select 2
                showToast('You can only select 2 food options! 😊');
            }
        }
        
        // Update counter and button
        document.getElementById('food-count').textContent = dateData.foods.length;
        document.getElementById('food-continue').disabled = dateData.foods.length !== 2;
    });
});

// Single selection handler for drinks, desserts, and activities
function setupSingleSelection(gridClass, dataKey, continueId) {
    document.querySelectorAll(`.${gridClass} .option-card`).forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            document.querySelectorAll(`.${gridClass} .option-card`).forEach(c => {
                c.classList.remove('selected');
            });
            
            // Add new selection
            this.classList.add('selected');
            dateData[dataKey] = this.dataset[dataKey];
            
            // Enable continue button
            document.getElementById(continueId).disabled = false;
        });
    });
}

// Setup single selections
setupSingleSelection('drinks-grid', 'drink', 'drink-continue');
setupSingleSelection('dessert-grid', 'dessert', 'dessert-continue');
setupSingleSelection('activity-grid', 'activity', 'activity-continue');

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(102, 126, 234, 0.9);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

// Add slide down animation for toast
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(toastStyle);

// Submit data and show final page
async function submitAndFinish() {
    // Format the data nicely
    const formattedData = {
        "Date Response": dateData.response,
        "Food Choices": dateData.foods.join(', '),
        "Drink Choice": dateData.drink,
        "Dessert Choice": dateData.dessert,
        "Activity Choice": dateData.activity,
        "Submitted At": new Date().toLocaleString()
    };
    
    // Save to localStorage (as backup)
    localStorage.setItem('dateChoices', JSON.stringify(formattedData));
    
    // Submit to Web3Forms (free service)
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_key: '4343c25b-36f6-4481-bf19-639f617095df',
                subject: 'New Date Response from Pookie! 💕',
                from_name: 'Date Planner',
                ...formattedData
            })
        });
        
        if (response.ok) {
            console.log('Choices submitted successfully!');
        }
    } catch (error) {
        console.log('Submission error:', error);
        // Still continue even if submission fails
    }
    
    // Also log to console for easy access
    console.log('Date Choices:', formattedData);
    
    // Show final page
    showPage(7);
    
    // Celebration animation
    createHearts();
    confetti();
}

// Confetti animation for final page
function confetti() {
    const colors = ['#667eea', '#f093fb', '#f5576c', '#fa709a', '#fee140'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confettiPiece = document.createElement('div');
            confettiPiece.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${3 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confettiPiece);
            
            setTimeout(() => confettiPiece.remove(), 5000);
        }, i * 30);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Check for saved data on load (for viewing responses)
window.addEventListener('load', () => {
    const savedData = localStorage.getItem('dateChoices');
    if (savedData) {
        console.log('Previous choices found:', JSON.parse(savedData));
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && currentPage === 2) {
        const continueBtn = document.querySelector('.page.active .continue-btn');
        if (continueBtn && !continueBtn.disabled) {
            continueBtn.click();
        }
    }
});