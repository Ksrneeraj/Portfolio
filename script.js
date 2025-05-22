document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior
            // Scroll to the target section smoothly
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if it's open after clicking a link
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Toggle functionality for the mobile navigation menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden'); // Toggle visibility of the mobile menu
        });
    }


    // Intersection Observer API for scroll-triggered animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'visible' class when element enters viewport
                entry.target.classList.add('visible');
                // For journey items, apply specific slide animation based on side
                if (entry.target.classList.contains('journey-item')) {
                    if (entry.target.classList.contains('left-side')) {
                        entry.target.classList.add('slide-in-left');
                    } else if (entry.target.classList.contains('right-side')) {
                        entry.target.classList.add('slide-in-right');
                    }
                }
                observer.unobserve(entry.target); // Stop observing once animated to prevent re-triggering
            }
        });
    };

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Create a new Intersection Observer instance only if it's supported
    if (typeof IntersectionObserver !== 'undefined') {
        const sectionObserver = new IntersectionObserver(animateOnScroll, observerOptions);

        // Observe all elements that have animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .journey-item').forEach(el => {
            sectionObserver.observe(el);
        });
    } else {
        console.warn('IntersectionObserver is not supported in this environment. Scroll animations may not work.');
        // Optionally, add a fallback for older browsers if animations are critical
        // For example, just make elements visible immediately:
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .journey-item').forEach(el => {
            el.classList.add('visible');
        });
    }


    // Project Modal Logic
    const projectModal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.close-button');
    const viewDetailsButtons = document.querySelectorAll('.view-details-button');

    // Data for each project to populate the modal
    const projectsData = {
        healthCareAI: {
            title: "AI-Powered Health Care Assistance",
            image: "./assets/health thumb.png",
            description: "Developed a full-stack AI-powered healthcare assistance website using the MERN stack, integrating features like appointment booking, prescription analysis, and medicine dosage tracking. Implemented a chatbot-powered workout trainee assistant, enhancing user engagement and providing personalized fitness recommendations. Designed and built a user-friendly dashboard for tracking health metrics, managing prescriptions, and accessing a pill store, improving patient experience and accessibility.",
            tech: ["MERN Stack", "AI", "Chatbot", "API Integration"],
            role: "My Role: Full-stack Developer & AI Integrator",
            contributions: "Developed the full-stack website, integrated features like appointment booking and prescription analysis, implemented a chatbot-powered workout trainee, and designed the user-friendly dashboard.",
            challenges: "Integrating diverse functionalities (booking, analysis, chatbot) into a cohesive user experience and ensuring data privacy for health metrics.",
            outcomes: "Enhanced user engagement and provided personalized fitness recommendations, improving patient experience and accessibility to health management tools.",
            liveDemo: "#", // Placeholder link
            sourceCode: "#" // Placeholder link
        },
        wasteManagement: {
            title: "Waste Management Website",
            image: "./assets/wastthumb.png",
            description: "Developed a platform for users to sell their waste, which is resold to industries. Promoted sustainability by developing eco-friendly products such as chairs and stationery from waste materials. Facilitated a marketplace connecting consumers and industries for waste trading and recycling.",
            tech: ["Web Development", "Marketplace", "Sustainability"],
            role: "My Role: Platform Developer",
            contributions: "Built the waste trading platform, facilitated waste reselling to industries, and promoted sustainability through eco-friendly product development.",
            challenges: "Creating a robust marketplace for diverse waste materials and ensuring efficient matching between sellers and industrial buyers.",
            outcomes: "Successfully facilitated waste trading and recycling, contributing to environmental sustainability by converting waste into useful products.",
            liveDemo: "#", // Placeholder link
            sourceCode: "#" // Placeholder link
        },
        outfitAssistant: {
            title: "Virtual AI Outfit Assistant",
            image: "./assets/aioutfitthumb.png",
            description: "Built an AI Outfit Assistant using MERN Stack, integrating Open Weather API for weather-based clothing recommendations. Developed a dynamic UI for personalized outfit suggestions based on real-time weather data. Optimized API integration for seamless weather updates and accurate recommendations.",
            tech: ["MERN Stack", "AI", "Open Weather API", "Dynamic UI"],
            role: "My Role: AI Developer & UI/UX Designer",
            contributions: "Developed the AI Outfit Assistant using MERN Stack, integrated the Open Weather API, and designed a dynamic UI for personalized outfit suggestions.",
            challenges: "Ensuring accurate weather-based recommendations and optimizing API integration for real-time data updates.",
            outcomes: "Provided personalized outfit suggestions based on real-time weather, enhancing user experience and convenience.",
            liveDemo: "#", // Placeholder link
            sourceCode: "#" // Placeholder link
        }
    };

    // Add click event listeners to all "View Details" buttons
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectId = e.target.dataset.project; // Get the project ID from data-project attribute
            const project = projectsData[projectId]; // Retrieve project data

            if (project) {
                // Populate modal with project data
                document.getElementById('modal-project-title').textContent = project.title;
                document.getElementById('modal-project-image').src = project.image;
                document.getElementById('modal-project-image').alt = project.title;
                document.getElementById('modal-project-description').textContent = project.description;
                document.getElementById('modal-project-role').textContent = project.role;
                document.getElementById('modal-project-contributions').textContent = project.contributions;
                document.getElementById('modal-project-challenges').textContent = project.challenges;
                document.getElementById('modal-project-outcomes').textContent = project.outcomes;

                // Clear and re-populate tech stack tags
                const techContainer = document.getElementById('modal-project-tech');
                techContainer.innerHTML = ''; // Clear previous tags
                project.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'bg-[#222222] text-gray-300 text-sm px-3 py-1 rounded-full';
                    span.textContent = tech;
                    techContainer.appendChild(span);
                });

                // Set live demo and source code links
                document.getElementById('modal-live-demo').href = project.liveDemo;
                document.getElementById('modal-source-code').href = project.sourceCode;

                projectModal.style.display = 'block'; // Show the modal
                document.body.style.overflow = 'hidden'; // Prevent scrolling of the background content
            }
        });
    });

    // Close modal when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            projectModal.style.display = 'none'; // Hide the modal
            document.body.style.overflow = ''; // Restore scrolling of the background content
        });
    }


    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target == projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Contact Form Submission (Basic client-side validation and message display)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission to a server

            // Get form input values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple client-side validation
            if (name && email && message) {
                // In a real application, this data would be sent to a backend (e.g., using fetch API)
                // For this demonstration, we just display a success message to the user
                formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                formMessage.classList.remove('hidden'); // Show the message
                formMessage.classList.add('text-green-400'); // Style as success
                formMessage.classList.remove('text-red-400'); // Remove error style if present
                contactForm.reset(); // Clear the form fields
            } else {
                // Display an error message if fields are not filled
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.classList.remove('hidden');
                formMessage.classList.add('text-red-400'); // Style as error
                formMessage.classList.remove('text-green-400'); // Remove success style if present
            }
        });
    }


    // Skills Carousel Auto-Scroll
    const skillsCarouselContainer = document.getElementById('skills-carousel-container');
    const skillsCarousel = document.getElementById('skills-carousel');

    let skillsAutoScrollInterval;
    let skillsScrollSpeed = 2; // Pixels per frame for animation

    // Function to start automatic scrolling for skills
    function startSkillsAutoScroll() {
        stopSkillsAutoScroll(); // Clear any existing interval
        if (!skillsCarouselContainer || !skillsCarousel) return;
        skillsAutoScrollInterval = setInterval(() => {
            if (skillsCarouselContainer.scrollLeft >= skillsCarousel.scrollWidth / 2) {
                skillsCarouselContainer.scrollLeft -= skillsCarousel.scrollWidth / 2;
            } else {
                skillsCarouselContainer.scrollLeft += skillsScrollSpeed;
            }
        }, 20);
    }

    // Function to stop automatic scrolling for skills
    function stopSkillsAutoScroll() {
        clearInterval(skillsAutoScrollInterval);
    }

    // Start auto-scroll on page load for skills
    startSkillsAutoScroll();

    // Pause auto-scroll on mouse enter, resume on mouse leave for skills
    if (skillsCarouselContainer) {
        skillsCarouselContainer.addEventListener('mouseenter', stopSkillsAutoScroll);
        skillsCarouselContainer.addEventListener('mouseleave', startSkillsAutoScroll);
        skillsCarouselContainer.addEventListener('touchstart', stopSkillsAutoScroll);
        skillsCarouselContainer.addEventListener('touchend', startSkillsAutoScroll);
    }

    // Journey Data
    const journeyData = [
        {
            id: "btech",
            title: "B.Tech (CSE- AI & ML)",
            organization: "VNR Vignana Jyothi Institute of Engineering Technology",
            duration: "2022 - 2026",
            location: "Hyderabad, Telangana, India",
            description: "Currently pursuing Bachelor of Computer Science with specialization in AI & ML. Maintaining a strong academic record with a CGPA of 8.63.",
            skills: ["Machine Learning", "Artificial Intelligence", "Data Structures & Algorithms", "MERN Stack"]
        },
        {
            id: "ibm-intern",
            title: "Generative AI Intern",
            organization: "IBM",
            duration: "Feb 2024 - Mar 2024 · 2 mos",
            location: "Telangana, India · Remote",
            description: "During my internship with IBM Skill Build, I had the chance to dive deep into the world of generative AI. It. It was an amazing learning experience where I got to work on real-world AI projects, experimenting with different models and seeing firsthand how they can be applied in various industries. I spent a lot of time working on data preparation, training models, and figuring out how to make them more efficient. This experience not only improved my technical skills but also gave me a better understanding of how AI can be used creatively to solve complex problems.",
            skills: ["Generative AI", "Python Programming", "Langchain", "Hugging Face"]
        },
        {
            id: "krithomedh-volunteer",
            title: "Volunteer",
            organization: "Krithomedh VNRVJIET",
            duration: "Mar 2024 - Aug 2024 · 6 mos",
            location: "Hyderabad, Telangana, India",
            description: "Actively contributed to the successful execution of technical events and contests, assisting in logistics, participant engagement, and ensuring smooth operations for the technical fest.",
            skills: ["Public Speaking", "Team Management", "Event Coordination"]
        },
        {
            id: "nss-volunteer",
            title: "Volunteer",
            organization: "National Service Scheme (NSS)",
            duration: "Feb 2024 - Dec 2024 · 11 mos",
            location: "Hyderabad, Telangana, India",
            description: "Engaged in various social responsibility initiatives, including organizing community outreach programs and participating in awareness campaigns to promote civic duties and social welfare.",
            skills: ["Social Responsibility", "Public Speaking", "Community Engagement", "Outreach"]
        },
        {
            id: "krithomedh-gs",
            title: "General Secretary",
            organization: "Krithomedh VNRVJIET",
            duration: "Aug 2024 - Present · 10 mos",
            location: "Hyderabad, Telangana, India",
            description: "Led the organizing committee for technical events, coding contests, and National-level hackathons. Served as the Event Management Lead and PR Head, coordinating outreach programs to promote events and foster participation.",
            skills: ["Team Leadership", "Team Management", "Event Management", "Public Relations"]
        },
        {
            id: "nss-organizing",
            title: "Organizing Team",
            organization: "National Service Scheme (NSS)",
            duration: "Dec 2024 - Present · 6 mos",
            location: "Hyderabad, Telangana, India",
            description: "As part of the organizing team, I played a key role in planning and executing various NSS events, including a Mega Blood Donation drive, appreciation events, and a seed ball event. Coordinated special camps to provide essential supplies to villages and government schools.",
            skills: ["Social Responsibility", "Team Management", "Event Organization", "Community Development"]
        }
    ];

    const journeyContainerWrapper = document.getElementById('journey-container-wrapper');
    const journeyGlowLine = document.getElementById('journey-glow-line'); // Get glow line element

    function renderJourney() {
        if (!journeyContainerWrapper) return;
        // Clear existing content, but keep the glow line div
        const existingGlowLine = document.getElementById('journey-glow-line');
        journeyContainerWrapper.innerHTML = '';
        if (existingGlowLine) {
            journeyContainerWrapper.appendChild(existingGlowLine);
        }

        journeyData.forEach((item, index) => {
            const sideClass = (index % 2 === 0) ? 'left-side' : 'right-side'; // Alternate sides
            const journeyItemDiv = document.createElement('div');
            journeyItemDiv.className = `journey-item ${sideClass}`;
            journeyItemDiv.setAttribute('data-id', item.id); // Add data-id for observation

            let skillsHtml = '';
            if (item.skills && item.skills.length > 0) {
                skillsHtml = `<div class="flex flex-wrap gap-2 mt-2">`;
                item.skills.forEach(skill => {
                    skillsHtml += `<span class="bg-[#222222] text-gray-300 text-xs px-2 py-1 rounded-full">${skill}</span>`;
                });
                skillsHtml += `</div>`;
            }

            journeyItemDiv.innerHTML = `
                <div class="journey-circle">${index + 1}</div>
                <div class="journey-item-content">
                    <h3 class="text-xl font-bold text-white">${item.title}</h3>
                    <p class="text-gray-300 text-md mb-1">${item.organization}</p>
                    <p class="text-gray-300 text-sm mb-1">${item.duration}</p>
                    ${item.location ? `<p class="text-gray-300 text-sm mb-2">${item.location}</p>` : ''}
                    <p class="text-white text-base leading-relaxed">${item.description}</p>
                    ${skillsHtml}
                </div>
            `;
            journeyContainerWrapper.appendChild(journeyItemDiv);
        });

        // Re-observe newly added journey items for animation
        if (typeof IntersectionObserver !== 'undefined') {
            const journeyObserver = new IntersectionObserver(animateOnScroll, observerOptions);
            document.querySelectorAll('.journey-item').forEach(el => {
                journeyObserver.observe(el);
            });
        }
    }

    renderJourney(); // Call render function on page load

    // Function to update the height of the glowing line in the journey section
    const updateGlowLineHeight = () => {
        if (!journeyContainerWrapper || !journeyGlowLine) return;

        const wrapperRect = journeyContainerWrapper.getBoundingClientRect();
        const wrapperAbsoluteTop = window.scrollY + wrapperRect.top; // Absolute top of the wrapper in the document

        let glowHeight = 0;
        // If the bottom of the viewport has scrolled past the top of the journey section
        if (window.scrollY + window.innerHeight > wrapperAbsoluteTop) {
            // Calculate how much of the journey section is currently visible from its top
            glowHeight = (window.scrollY + window.innerHeight) - wrapperAbsoluteTop;
            // Cap the height at the total height of the journey container
            glowHeight = Math.min(glowHeight, wrapperRect.height);
        }

        journeyGlowLine.style.height = `${glowHeight}px`;
        journeyGlowLine.style.top = '0px'; // Ensure it always starts from the top of the container
    };

    // Initial update and add event listener for the glow line
    updateGlowLineHeight();
    window.addEventListener('scroll', updateGlowLineHeight);
    window.addEventListener('resize', updateGlowLineHeight); // Update on resize too

    // Terminal Text Effect Logic for Header Name
    const headerNameTerminalElement = document.getElementById('header-name-terminal');
    const messages = [
        "SREE RAM NEERAJ KUCHIPUDI",
        "I'm a AI Generalist",
        "I'm a Data Analyst",
        "I'm a Full Stack Developer",
        "I'm a ML Engineer"
    ];
    let messageIndex = 0;
    let charIndex = 0;
    let typingSpeed = 100; // milliseconds per character for typing
    let deletingSpeed = 50; // milliseconds per character for deleting
    let pauseTime = 1500; // milliseconds to pause after typing

    function typeMessage() {
        const currentMessage = messages[messageIndex];
        if (headerNameTerminalElement && charIndex < currentMessage.length) {
            headerNameTerminalElement.textContent += currentMessage.charAt(charIndex);
            charIndex++;
            setTimeout(typeMessage, typingSpeed);
        } else if (headerNameTerminalElement) {
            headerNameTerminalElement.classList.add('typing-cursor');
            setTimeout(deleteMessage, pauseTime);
        }
    }

    function deleteMessage() {
        if (headerNameTerminalElement && headerNameTerminalElement.textContent.length > 0) {
            headerNameTerminalElement.textContent = headerNameTerminalElement.textContent.slice(0, -1);
            setTimeout(deleteMessage, deletingSpeed);
        } else if (headerNameTerminalElement) {
            headerNameTerminalElement.classList.remove('typing-cursor');
            messageIndex = (messageIndex + 1) % messages.length; // Move to the next message, loop back if at end
            charIndex = 0; // Reset character index for new message
            setTimeout(typeMessage, 500); // Short delay before typing the next message
        }
    }

    // Start the typing effect for the first message when the page loads
    typeMessage();

    // Add event listener for the "View My Work" button
    const viewMyWorkButton = document.getElementById('view-my-work-button');
    if (viewMyWorkButton) {
        viewMyWorkButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
