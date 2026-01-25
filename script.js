document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'elegantBlockNotes';
    let notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let isDarkMode = localStorage.getItem('darkMode') === 'true' || (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // --- DOM Elements ---
    const body = document.getElementById('body');
    const appContainer = document.getElementById('appContainer');
    const appTitle = document.getElementById('appTitle');
    const appSubtitle = document.getElementById('appSubtitle');
    const inputArea = document.getElementById('inputArea');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentTextarea = document.getElementById('noteContent');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');
    const emptyMessage = document.getElementById('emptyMessage');
    const themeToggle = document.getElementById('themeToggle');
    const iconLight = document.getElementById('iconLight');
    const iconDark = document.getElementById('iconDark');

    // --- Theme Management ---
    const applyTheme = (darkMode) => {
        // Reset general classes first to avoid conflicts during toggle
        body.className = body.className.replace(/(^|\s)bg-\S+|text-\S+/g, '').trim();
        appContainer.className = appContainer.className.replace(/(^|\s)bg-\S+|text-\S+/g, '').trim();
        appTitle.className = appTitle.className.replace(/(^|\s)bg-clip-text.*|text-\w+-\d+/g, '').trim();
        appSubtitle.className = appSubtitle.className.replace(/(^|\s)text-\w+-\d+/g, '').trim();
        inputArea.className = inputArea.className.replace(/(^|\s)glass-card-\w+|border-\w+/g, '').trim();
        addNoteBtn.className = addNoteBtn.className.replace(/(^|\s)light-\w+|dark-\w+/g, '').trim();

        if (darkMode) {
            // Dark Mode Styles
            body.classList.add('bg-slate-900', 'text-white', 'transition-colors', 'duration-500');
            appContainer.classList.add('bg-slate-900', 'text-white', 'transition-colors', 'duration-500');
            
            appTitle.classList.add('bg-clip-text', 'text-transparent', 'bg-gradient-to-r', 'from-white', 'to-blue-200');
            appSubtitle.classList.add('text-lg', 'text-blue-200/80');
            
            inputArea.classList.add('glass-card-dark', 'shadow-2xl');
            
            addNoteBtn.classList.add('dark-add-btn');
            
            document.querySelectorAll('.note-card').forEach(card => {
                // Clean existing dynamic classes and reapply structure/dark styles
                card.className = card.className.replace(/(^|\s)(bg-|text-|border-).+?\s*/g, '').trim();
                card.classList.add('note-card', 'p-5', 'rounded-xl', 'shadow-lg', 'flex', 'flex-col', 'border-l-4', 'border-blue-500', 'transition-all', 'duration-300', 'hover:shadow-xl', 'bg-slate-800/70', 'text-white', 'border-slate-700/50');
                
                const ts = card.querySelector('.note-timestamp');
                if(ts) ts.className = 'text-xs text-slate-400';
                const title = card.querySelector('.note-title');
                if(title) title.className = 'text-xl font-semibold text-white mb-1';
                const content = card.querySelector('.note-content-text');
                if(content) content.className = 'text-sm text-slate-200';
            });
            
            iconLight.classList.add('hidden');
            iconDark.classList.remove('hidden');
            localStorage.setItem('darkMode', 'true');
        } else {
            // Light Mode Styles
            body.classList.add('bg-slate-50', 'text-slate-900', 'transition-colors', 'duration-500');
            appContainer.classList.add('bg-white', 'text-slate-900', 'transition-colors', 'duration-500');
            
            appTitle.classList.add('bg-clip-text', 'text-transparent', 'bg-gradient-to-r', 'from-slate-900', 'to-blue-600');
            appSubtitle.classList.add('text-lg', 'text-slate-600');
            
            inputArea.classList.add('glass-card-light', 'shadow-xl');
            
            addNoteBtn.classList.add('light-add-btn');

            document.querySelectorAll('.note-card').forEach(card => {
                // Clean existing dynamic classes and reapply structure/light styles
                card.className = card.className.replace(/(^|\s)(bg-|text-|border-).+?\s*/g, '').trim();
                card.classList.add('note-card', 'p-5', 'rounded-xl', 'shadow-lg', 'flex', 'flex-col', 'border-l-4', 'border-blue-500', 'transition-all', 'duration-300', 'hover:shadow-xl', 'bg-white', 'text-slate-900', 'border-slate-200');
                
                const ts = card.querySelector('.note-timestamp');
                if(ts) ts.className = 'text-xs light-mode-muted';
                const title = card.querySelector('.note-title');
                if(title) title.className = 'text-xl font-semibold text-slate-900 mb-1';
                const content = card.querySelector('.note-content-text');
                if(content) content.className = 'text-sm text-slate-700';
            });
            
            iconLight.classList.remove('hidden');
            iconDark.classList.add('hidden');
            localStorage.setItem('darkMode', 'false');
        }
        updateInputStyles(); // Ensure input fields adopt the correct base class
    };

    const toggleTheme = () => {
        isDarkMode = !isDarkMode;
        applyTheme(isDarkMode);
    };

    themeToggle.addEventListener('click', toggleTheme);

    // --- Note Operations ---

    const saveNotes = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    };

    const renderNotes = () => {
        notesList.innerHTML = '';
        if (notes.length === 0) {
            emptyMessage.classList.remove('hidden');
            return;
        }
        emptyMessage.classList.add('hidden');

        // Sort by newest first
        notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        notes.forEach(note => {
            const noteElement = createNoteElement(note);
            notesList.appendChild(noteElement);
        });
        
        // Re-apply theme styles to newly rendered notes (important if called before initial theme application completes)
        applyTheme(isDarkMode);
    };

    const createNoteElement = (note) => {
        const card = document.createElement('div');
        const timestamp = new Date(note.timestamp).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        
        // Base structure classes defined here. Theme classes are conditionally added/overwritten in applyTheme.
        card.className = `note-card p-5 rounded-xl shadow-lg flex flex-col border-l-4 border-blue-500 transition-all duration-300 hover:shadow-xl`;
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h3 class="note-title flex-grow break-words pr-4">${note.title || 'Note sans titre'}</h3>
                <button data-id="${note.id}" class="delete-btn p-1 rounded-full text-red-400 hover:text-red-500 transition-colors opacity-75 hover:opacity-100" aria-label="Supprimer la note">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M15 3V3a2 2 0 0 0-2 2V6"/><path d="M9 3V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2V6"/></svg>
                </button>
            </div>
            <p class="note-content-text flex-grow whitespace-pre-wrap mb-3">${note.content}</p>
            <p class="note-timestamp mt-auto">Créée le : ${timestamp}</p>
        `;

        // Add delete functionality dynamically
        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteNote(note.id);
        });
        
        return card;
    };

    const deleteNote = (id) => {
        notes = notes.filter(note => note.id !== id);
        saveNotes();
        renderNotes(); // Rerender applies theme classes again
    };

    const addNote = () => {
        const title = noteTitleInput.value.trim();
        const content = noteContentTextarea.value.trim();

        if (!content) {
            alert("Le contenu de la note ne peut pas être vide.");
            noteContentTextarea.focus();
            return;
        }

        const newNote = {
            id: Date.now().toString(),
            title: title || "(Note sans titre)",
            content: content,
            timestamp: new Date().toISOString()
        };

        notes.push(newNote);
        saveNotes();
        noteTitleInput.value = '';
        noteContentTextarea.value = '';
        noteTitleInput.focus(); // Return focus to title input
        renderNotes();
    };

    // --- Initial Setup ---
    
    const updateInputStyles = () => {
        // Clean existing style classes for inputs
        noteTitleInput.className = noteTitleInput.className.replace(/(^|\s)light-\w+|dark-\w+/g, '').trim();
        noteContentTextarea.className = noteContentTextarea.className.replace(/(^|\s)light-\w+|dark-\w+/g, '').trim();

        if (isDarkMode) {
            noteTitleInput.classList.add('dark-input-field');
            noteContentTextarea.classList.add('dark-input-field');
        } else {
            noteTitleInput.classList.add('light-input-field');
            noteContentTextarea.classList.add('light-input-field');
        }
    };

    // 1. Apply saved theme preference
    applyTheme(isDarkMode);

    // 2. Load existing notes
    renderNotes();

    // 3. Event Listeners
    addNoteBtn.addEventListener('click', addNote);
    
    // Allow adding note via Enter key in textarea (Ctrl+Enter for new line)
    noteContentTextarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey && !e.altKey) {
            e.preventDefault();
            addNote();
        }
    });

    // Ensure input styling is correct after initial theme setup
    updateInputStyles();

    // Re-apply styles on theme change
    themeToggle.addEventListener('click', () => {
        // applyTheme handles most global updates, but we ensure inputs are updated right after.
        setTimeout(() => { 
            updateInputStyles();
        }, 10);
    });
});