// js/registration.js

document.addEventListener('DOMContentLoaded', () => {
    const tabBackend = document.getElementById('tabBackend');
    const tabFrontend = document.getElementById('tabFrontend');
    const timelineStage = document.getElementById('curriculumTimelineStage');
    const admissionForm = document.getElementById('hctiAdmissionForm');

    // ==========================================================================
    // SYLLABUS CURRICULUM DATA BLUEPRINTS OBJECT DATA MATRIX
    // ==========================================================================
    const dataSyllabus = {
        backend: [
            { week: "Weeks 1 - 4", title: "Core Logic Engineering Foundations", details: "Deep immersion into advanced Python architecture scripts, data schemas, algorithmic matrices, and object-oriented paradigms." },
            { week: "Weeks 5 - 8", title: "Relational Modeling & Core Django Web", details: "Setting up database architectures with PostgreSQL. Initializing multi-route Django structures, views, and template controllers." },
            { week: "Weeks 9 - 12", title: "REST APIs & Security Authentication", details: "Architecting backend processing structures via Django REST Framework (DRF), complete with secure token management protocols." },
            { week: "Weeks 13 - 16", title: "System Scalability & Production Launch", details: "Docker setups, server optimization profiles, database connections, and running clean deployments to production cloud systems." }
        ],
        frontend: [
            { week: "Weeks 1 - 4", title: "Responsive Layout Architectures & UI CSS", details: "Mastering responsive design structures. Building high-end typography scaling layouts using CSS variables and modern Grid systems." },
            { week: "Weeks 5 - 8", title: "Functional Vanilla Javascript Control", details: "Manipulating document DOM trees, processing structural user events, coordinating asynchronous flows, and connecting external system payloads." },
            { week: "Weeks 9 - 12", title: "Asynchronous API Communications", details: "Connecting with backend servers using Fetch APIs, handling JSON files, and rendering streaming data blocks securely onto dashboards." },
            { week: "Weeks 13 - 16", title: "State Control Systems & Final Optimization", details: "Managing app states, caching inputs, and deploying highly responsive, lightning-fast interfaces across viewports." }
        ]
    };

    // Render loop helper function
    function renderSyllabusModules(trackKey) {
        timelineStage.innerHTML = ''; // Wipe current visible rows clean
        
        dataSyllabus[trackKey].forEach(module => {
            const moduleNode = document.createElement('div');
            moduleNode.classList.add('syllabus-week-module');
            moduleNode.innerHTML = `
                <div class="module-header">
                    <span class="module-badge">${module.week}</span>
                </div>
                <h4 class="module-title">${module.title}</h4>
                <p class="module-details">${module.details}</p>
            `;
            timelineStage.appendChild(moduleNode);
        });
    }

    // Default initializing render loadout parameters state
    renderSyllabusModules('backend');

    // Tab Switch Event Listeners
    tabBackend.addEventListener('click', () => {
        tabFrontend.classList.remove('active');
        tabBackend.classList.add('active');
        renderSyllabusModules('backend');
    });

    tabFrontend.addEventListener('click', () => {
        tabBackend.classList.remove('active');
        tabFrontend.classList.add('active');
        renderSyllabusModules('frontend');
    });

    // ==========================================================================
    // CLIENT SIDE ADMISSION APPLICATION CAPTURE DATA VALIDATION ENGINE
    // ==========================================================================
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Halt standard browser reloading mechanics

        // Capturing current raw variable data states from form fields
        const studentProfile = {
            name: document.getElementById('studentName').value.trim(),
            email: document.getElementById('studentEmail').value.trim(),
            track: document.getElementById('targetTrack').value,
            mode: document.getElementById('learningMode').value
        };

        // Simulated validation feedback confirmation overlay
        alert(`🎉 Application Recorded Successfully, ${studentProfile.name}!\n\nYour profile has been validated for the ${studentProfile.track.toUpperCase()} cohort track (${studentProfile.mode} mode).\n\nWhen we deploy our Django project backend, this exact dataset will be funneled straight into our secure PostgreSQL data models!`);
        
        admissionForm.reset(); // Wipe all fields clean automatically
    });
});


// js/registration.js

document.addEventListener('DOMContentLoaded', () => {
    const tabBackend = document.getElementById('tabBackend');
    const tabFrontend = document.getElementById('tabFrontend');
    const timelineStage = document.getElementById('curriculumTimelineStage');
    const admissionForm = document.getElementById('hctiAdmissionForm');
    
    // Sub-Nav elements tracking hooks
    const subnavTrackIndicator = document.getElementById('subnavTrackIndicator');
    const anchorOverview = document.getElementById('anchorOverview');
    const anchorApply = document.getElementById('anchorApply');
    const curriculumSection = document.getElementById('curriculum-section');

    // ==========================================================================
    // SYLLABUS DATA DICTIONARY BLUEPRINTS
    // ==========================================================================
    const dataSyllabus = {
        backend: [
            { week: "Weeks 1 - 4", title: "Core Logic Engineering Foundations", details: "Deep immersion into advanced Python architecture scripts, data schemas, algorithmic matrices, and object-oriented paradigms." },
            { week: "Weeks 5 - 8", title: "Relational Modeling & Core Django Web", details: "Setting up database architectures with PostgreSQL. Initializing multi-route Django structures, views, and template controllers." },
            { week: "Weeks 9 - 12", title: "REST APIs & Security Authentication", details: "Architecting backend processing structures via Django REST Framework (DRF), complete with secure token management protocols." },
            { week: "Weeks 13 - 16", title: "System Scalability & Production Launch", details: "Docker setups, server optimization profiles, database connections, and running clean deployments to production cloud systems." }
        ],
        frontend: [
            { week: "Weeks 1 - 4", title: "Responsive Layout Architectures & UI CSS", details: "Mastering responsive design structures. Building high-end typography scaling layouts using CSS variables and modern Grid systems." },
            { week: "Weeks 5 - 8", title: "Functional Vanilla Javascript Control", details: "Manipulating document DOM trees, processing structural user events, coordinating asynchronous flows, and connecting external system payloads." },
            { week: "Weeks 9 - 12", title: "Asynchronous API Communications", details: "Connecting with backend servers using Fetch APIs, handling JSON files, and rendering streaming data blocks securely onto dashboards." },
            { week: "Weeks 13 - 16", title: "State Control Systems & Final Optimization", details: "Managing app states, caching inputs, and deploying highly responsive, lightning-fast interfaces across viewports." }
        ]
    };

    function renderSyllabusModules(trackKey) {
        timelineStage.innerHTML = ''; 
        
        dataSyllabus[trackKey].forEach(module => {
            const moduleNode = document.createElement('div');
            moduleNode.classList.add('syllabus-week-module');
            moduleNode.innerHTML = `
                <div class="module-header"><span class="module-badge">${module.week}</span></div>
                <h4 class="module-title">${module.title}</h4>
                <p class="module-details">${module.details}</p>
            `;
            timelineStage.appendChild(moduleNode);
        });

        // Sync text labels inside subnav banner smoothly
        subnavTrackIndicator.textContent = trackKey === 'backend' ? 'Backend Engineering' : 'Frontend Engineering';
    }

    // Default initialization load out parameters state
    renderSyllabusModules('backend');

    // Tab Switches
    tabBackend.addEventListener('click', () => {
        tabFrontend.classList.remove('active');
        tabBackend.classList.add('active');
        renderSyllabusModules('backend');
    });

    tabFrontend.addEventListener('click', () => {
        tabBackend.classList.remove('active');
        tabFrontend.classList.add('active');
        renderSyllabusModules('frontend');
    });

    // ==========================================================================
    // REAL-TIME ACTIVE SCROLL HIGHLIGHTING ENGINE (SCROLLSPY)
    // ==========================================================================
    window.addEventListener('scroll', () => {
        const formTopBound = admissionForm.getBoundingClientRect().top;

        // If the form component has scrolled onto the page view area
        if (formTopBound < 200) {
            anchorOverview.classList.remove('active');
            anchorApply.classList.add('active');
        } else {
            anchorApply.classList.remove('active');
            anchorOverview.classList.add('active');
        }
    });

    // Form Submissions
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentProfile = {
            name: document.getElementById('studentName').value.trim(),
            email: document.getElementById('studentEmail').value.trim(),
            track: document.getElementById('targetTrack').value,
            mode: document.getElementById('learningMode').value
        };
        alert(`🎉 Application Recorded Successfully, ${studentProfile.name}!`);
        admissionForm.reset();
    });
});