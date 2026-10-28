// Run JavaScript after the page has loaded
document.addEventListener("DOMContentLoaded", function () {

    // 1. Check Profile Image
    const profileImage = document.querySelector(".hero-image img");

    if (profileImage) {
        profileImage.addEventListener("error", function () {
            console.error(
                "Profile image not found. Check assets/profile.jpeg."
            );
        });
    }

    console.log("Welcome to Anandhu Bince's portfolio!");

    // 2. Initialize EmailJS
    if (typeof emailjs === "undefined") {
        console.error("EmailJS library is not loaded.");
        return;
    }

    emailjs.init({
        publicKey: "AUEZ14rxkt9VtU5i7"
    });

    // 3. Contact Form
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const button = contactForm.querySelector(
                'button[type="submit"]'
            );

            const status = document.getElementById("form-status");

            if (button.disabled) {
                return;
            }

            button.disabled = true;
            button.textContent = "Sending...";

            if (status) {
                status.textContent = "Sending your message...";
            }

            try {
                await emailjs.sendForm(
                    "service_r7epnq5",
                    "template_24u2r4f",
                    contactForm
                );

                if (status) {
                    status.textContent =
                        "Message sent successfully! Thank you for contacting me.";
                }

                contactForm.reset();

            } catch (error) {
                console.error("EmailJS error:", error);

                if (status) {
                    status.textContent =
                        "Unable to send your message. Please try again.";
                }

            } finally {
                button.disabled = false;
                button.textContent = "Send Message →";
            }
        });
    }
});