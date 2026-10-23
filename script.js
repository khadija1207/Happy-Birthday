/* ==========================================
   MUNTAHA'S BIRTHDAY WEBSITE ♡
   Reliable buttons, popups, photos and effects
   ========================================== */

"use strict";

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


// ---------- 1. SAFE ELEMENT HELPERS ----------

function setText(selector, text) {
    const element = $(selector);

    if (element) {
        element.textContent = text;
    }

    return element;
}

function showElement(selector) {
    const element = $(selector);

    if (element) {
        element.classList.remove("hidden");
    }

    return element;
}

function hideElement(selector) {
    const element = $(selector);

    if (element) {
        element.classList.add("hidden");
    }

    return element;
}


// ---------- 2. POPUP MODAL ----------

function showModal(title, body) {
    const modal = $("#modal");
    const modalTitle = $("#modalTitle");
    const modalBody = $("#modalBody");

    if (!modal || !modalTitle || !modalBody) {
        console.error(
            "Birthday popup could not open. Check #modal, #modalTitle and #modalBody in index.html."
        );
        return;
    }

    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.classList.remove("hidden");

    document.body.classList.add("modal-open");
}

function closeModal() {
    hideElement("#modal");
    document.body.classList.remove("modal-open");
}

window.showModal = showModal;
window.closeModal = closeModal;


// ---------- 3. LITTLE TOAST MESSAGES ----------

let toastTimer;

function toast(message) {
    const element = $("#toast");

    if (!element) {
        console.info(message);
        return;
    }

    element.textContent = message;
    element.classList.remove("hidden");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        element.classList.add("hidden");
    }, 2800);
}

window.toast = toast;


// ---------- 4. CONFETTI EFFECT ----------

function confetti(amount = 36) {
    const symbols = ["♡", "✦", "✿", "🎀", "✨", "♥"];
    const colors = ["#b75e82", "#e8a6c0", "#d2b4e4", "#d5b26c"];

    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("div");

        piece.className = "confetti";
        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.animationDuration = 3 + Math.random() * 3 + "s";
        piece.style.animationDelay = Math.random() * 0.7 + "s";
        piece.style.color = colors[i % colors.length];

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 7000);
    }
}

window.confetti = confetti;


// ---------- 5. OPEN THE BIRTHDAY WORLD ----------

function setupBirthdayWorld() {
    const button = $("#openWorld");

    if (!button) return;

    button.addEventListener("click", () => {
        const world = $("#world");

        if (!world) {
            showModal(
                "A little hiccup ♡",
                "The birthday world section could not be found. Please check the element with id='world'."
            );
            return;
        }

        world.classList.remove("hidden");
        button.textContent = "your world is open ♡";

        world.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        confetti(22);
    });
}


// ---------- 6. FRIENDSHIP PHOTO UPLOAD ----------

function setupFriendshipPhotos() {
    const uploader = $("#photoUpload");

    if (!uploader) return;

    uploader.addEventListener("change", (event) => {
        const files = [...event.target.files]
            .filter(file => file.type.startsWith("image/"))
            .slice(0, 6);

        const cards = $$(".memory-card");
        let added = 0;

        files.forEach((file, index) => {
            const card = cards[index];

            if (!card) return;

            const slot = $(".photo-slot", card);

            if (!slot) return;

            let img = $("img", slot);

            if (!img) {
                img = document.createElement("img");
                img.alt = "Friendship memory";
                slot.prepend(img);
            }

            if (img.dataset.objectUrl) {
                URL.revokeObjectURL(img.dataset.objectUrl);
            }

            const imageUrl = URL.createObjectURL(file);

            img.src = imageUrl;
            img.dataset.objectUrl = imageUrl;

            added++;
        });

        if (added > 0) {
            setText(
                "#uploadStatus",
                `Added ${added} photo${added === 1 ? "" : "s"} to the scrapbook for this visit. ♡`
            );
        } else {
            toast("Choose an image to add to your scrapbook. ♡");
        }
    });
}


// ---------- 7. MINGYU PHOTO UPLOAD ----------

function setupMingyuPhotos() {
    const uploader = $("#mingyuUpload");

    if (!uploader) return;

    uploader.addEventListener("change", (event) => {
        const files = [...event.target.files]
            .filter(file => file.type.startsWith("image/"))
            .slice(0, 2);

        let added = 0;

        files.forEach((file, index) => {
            const slot = $(`#mingyuPhoto${index + 1}`);

            if (!slot) return;

            let img = $("img", slot);

            if (!img) {
                img = document.createElement("img");
                img.alt = "Mingyu photo";
                slot.prepend(img);
            }

            if (img.dataset.objectUrl) {
                URL.revokeObjectURL(img.dataset.objectUrl);
            }

            const imageUrl = URL.createObjectURL(file);

            img.src = imageUrl;
            img.dataset.objectUrl = imageUrl;

            added++;
        });

        if (added > 0) {
            toast("Mingyu room upgraded. Standards remain unreasonable. ♡");
        }
    });
}


// ---------- 8. MINGYU DRAMA BUTTON ----------

const dramaMessages = [
    "Emergency protocol activated: hydrate, breathe, and remember that your bias is probably not delivering your birthday cake.",
    "The committee has reviewed the evidence. Your reaction is understandable. Your dignity, however, is optional.",
    "Dispatching one imaginary Mingyu-shaped birthday hug. Estimated delivery: immediately.",
    "Breaking news: Muntaha is still not over it. Experts say she may never recover.",
    "We regret to inform you that the Mingyu obsession remains incurable. Happy birthday, anyway. ♡"
];

function mingyuDrama() {
    const message = $("#mingyuMessage");

    if (!message) {
        showModal(
            "Emergency Mingyu department ♡",
            dramaMessages[Math.floor(Math.random() * dramaMessages.length)]
        );
    } else {
        message.textContent =
            dramaMessages[Math.floor(Math.random() * dramaMessages.length)];
    }

    confetti(12);
}

window.mingyuDrama = mingyuDrama;


// ---------- 9. CLICKABLE HEART NOTES ----------

function setupHeartNotes() {
    const heartGrid = $("#heartGrid");

    if (!heartGrid || heartGrid.dataset.ready === "true") return;

    heartGrid.dataset.ready = "true";

    const messages = [
        "You're my soul sister, soulmate, soulperson or whatever they say. I love you!♡",
        "I hope this year is gentle with your heart, and that you are gentle with yourself.",
        "You deserve friendships where you can exhale and be fully yourself. And I really hope I can be that for you.",
        "I am rooting for the person you are becoming, not just what you achieve.",
        "Some of my favourite memories have your fingerprints all over them.",
        "Even from far away, you are part of my everyday world.",
        "May good things find you when you least expect them.",
        "Eight and a half years in, and I still hope we get a thousand more little memories."
    ];

    messages.forEach((message) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "heart-note";
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open a little reminder");

        const label = document.createElement("span");
        label.textContent = "tap to open";

        button.append("♡", label);

        button.addEventListener("click", () => {
            const isOpen = button.classList.toggle("open");

            button.replaceChildren();

            if (isOpen) {
                const text = document.createElement("span");
                text.textContent = message;
                button.appendChild(text);
            } else {
                const text = document.createElement("span");
                text.textContent = "tap to open";
                button.append("♡", text);
            }

            button.setAttribute("aria-expanded", String(isOpen));
        });

        heartGrid.appendChild(button);
    });
}


// ---------- 10. PERSONALISE THE LETTER ----------

function setupLetterEditor() {
    const editButton = $("#editLetter");
    const applyButton = $("#applyLetter");
    const saveButton = $("#saveLetter");
    const editor = $("#letterEditor");
    const input = $("#letterInput");
    const letter = $("#letterText");

    if (editButton && editor && input && letter) {
        editButton.addEventListener("click", () => {
            const opening = editor.classList.contains("hidden");

            if (opening) {
                input.value = letter.textContent;
                editor.classList.remove("hidden");
                input.focus();
            } else {
                editor.classList.add("hidden");
            }
        });
    }

    if (applyButton && editor && input && letter) {
        applyButton.addEventListener("click", () => {
            const value = input.value.trim();

            if (!value) {
                toast("Write a little something first. ♡");
                input.focus();
                return;
            }

            letter.textContent = value;
            editor.classList.add("hidden");

            toast("Your letter has been updated on this page. ♡");
        });
    }

    if (saveButton && letter) {
        saveButton.addEventListener("click", () => {
            const blob = new Blob(
                [letter.innerText || letter.textContent],
                { type: "text/plain;charset=utf-8" }
            );

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "A-letter-for-Muntaha.txt";

            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => URL.revokeObjectURL(url), 1000);

            toast("Your letter is ready to keep. ♡");
        });
    }
}


// ---------- 11. BIRTHDAY CAKE AND WISH ----------

function setupBirthdayCake() {
    const button = $("#blowCandles");

    if (!button) return;

    button.addEventListener("click", () => {
        const cake = $("#cake");
        const wish = $("#wishMessage");
        const againButton = $("#again");

        if (cake) {
            cake.classList.add("blown");
            cake.textContent = "🍰";
        }

        if (wish) {
            wish.textContent =
                "The world got Muntaha on this day. We got lucky. ♡";
        }

        button.textContent = "wish sent into the universe ✨";
        button.disabled = true;

        if (againButton) {
            againButton.classList.remove("hidden");
        }

        confetti(60);
    });

    const againButton = $("#again");

    if (againButton) {
        againButton.addEventListener("click", () => {
            showModal(
                "one more birthday hug ♡",
                "Imagine the biggest, warmest, slightly suffocating best-friend hug. Happy birthday, Muntaha. I hope this year loves you back."
            );

            confetti(20);
        });
    }
}


// ---------- 12. OPTIONAL MUSIC BUTTON ----------

function setupMusic() {
    const audio = $("#birthdayMusic");
    const button = $("#musicToggle");

    if (!audio || !button) return;

    button.addEventListener("click", async () => {
        try {
            if (audio.paused) {
                await audio.play();
                button.textContent = "pause music ♡";
            } else {
                audio.pause();
                button.textContent = "play music ♫";
            }
        } catch (error) {
            console.error("Music could not play:", error);
            toast("Tap again to start the music, or check the audio file path. ♡");
        }
    });

    audio.addEventListener("ended", () => {
        button.textContent = "play music ♫";
    });

    audio.addEventListener("pause", () => {
        button.textContent = "play music ♫";
    });

    audio.addEventListener("play", () => {
        button.textContent = "pause music ♡";
    });
}


// ---------- 13. MODAL CLOSE BEHAVIOUR ----------

function setupModal() {
    const modal = $("#modal");

    if (!modal) return;

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}


// ---------- 14. START EVERYTHING SAFELY ----------

function initialiseBirthdayWebsite() {
    setupBirthdayWorld();
    setupFriendshipPhotos();
    setupMingyuPhotos();
    setupHeartNotes();
    setupLetterEditor();
    setupBirthdayCake();
    setupMusic();
    setupModal();

    console.log("♡ Muntaha's birthday website is ready!");
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initialiseBirthdayWebsite,
        { once: true }
    );
} else {
    initialiseBirthdayWebsite();
}