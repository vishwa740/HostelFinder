document.addEventListener('DOMContentLoaded', () => {
    const startLoginButton = document.getElementById('startLogin');
    const phoneInput = document.getElementById('phone');
    const requestOtpButton = document.getElementById('requestOtp');
    const otpInput = document.getElementById('otp');
    const verifyOtpButton = document.getElementById('verifyOtp');
    const errorDisplay = document.getElementById('error');
    const welcomeContainer = document.querySelector('.welcome-container');
    const loginContainer = document.querySelector('.login-container');
    const citySelection = document.querySelector('.city-selection');
    const citySelect = document.getElementById('citySelect');
    const citySubmitButton = document.getElementById('citySubmit');
    const userOptions = document.querySelector('.user-options');
    const optionsSubmitButton = document.getElementById('optionsSubmit');
    const hostelResults = document.querySelector('.hostel-results');
    const hostelList = document.getElementById('hostelList');
    const navigationBar = document.querySelector('.navigation-bar');
    const navHomeButton = document.getElementById('navHome');
    const navFavoritesButton = document.getElementById('navFavorites');
    const navBackToCityButton = document.getElementById('navBackToCity');
    const hostelDetailsDiv = document.getElementById('hostelDetails');
    const hostelDetailsContent = document.getElementById('hostelDetailsContent');
    const closeDetailsButton = document.getElementById('closeDetails');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    welcomeContainer.querySelector('h2').textContent = "Welcome to Go Hostel";
    welcomeContainer.style.display = 'flex';

    startLoginButton.addEventListener('click', () => {
        welcomeContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
        loginContainer.style.alignItems = "center";
    });

    requestOtpButton.addEventListener('click', () => {
        otpInput.style.display = 'block';
        verifyOtpButton.style.display = 'block';
    });

    verifyOtpButton.addEventListener('click', () => {
        if (otpInput.value === "123456") {
            loginContainer.style.display = 'none';
            citySelection.style.display = 'flex';
            citySelection.style.alignItems = "center";
        } else {
            errorDisplay.textContent = "Incorrect OTP";
        }
    });

    citySubmitButton.addEventListener('click', () => {
        const selectedCity = citySelect.value;
        if (selectedCity) {
            citySelection.style.display = 'none';
            userOptions.style.display = 'flex';
            userOptions.style.alignItems = "center";
            navigationBar.style.display = 'flex';
        } else {
            alert("Please select a city.");
        }
    });

    optionsSubmitButton.addEventListener('click', () => {
        const area = document.getElementById('areaSelect').value;
        const hostelType = document.getElementById('hostelTypeSelect').value;
        if (!area) {
            alert("Please select an area.");
            return;
        }
        displayHostels(area, hostelType);

        userOptions.style.display = 'none';
        hostelResults.style.display = 'flex';
        hostelResults.style.alignItems = "normal";
        navigationBar.style.display = 'flex';
    });

    const hostelData = [
        { name: "Kukatpally Boys Hostel 1", address: "Kukatpally Address 1", pricing: "₹5000/month", gender: "Boys", amenities: ["Wifi", "Meals", "Gym", "Laundry", "Parking"], owner: "John Doe", directions: "https://www.google.com/maps/place/Landmark+A", rules: "No smoking, quiet hours after 10 PM", ecoStay: true, reviews: [{ user: "User 1", text: "Great place!", rating: 5 }, { user: "User 2", text: "Nice and clean.", rating: 4 }, { user: "User 3", text: "Good value.", rating: 4 }, { user: "User 4", text: "Friendly staff.", rating: 5 }, { user: "User 5", text: "Recommended!", rating: 4 }], hasAC: true, meals: "Breakfast and dinner included", specialFeatures: "Rooftop garden, community events, Swimming Movies at weekend", vacancy: "Yes", paymentOptions: ["Credit Card", "UPI", "Cash"], image: "img1.jpg", video: "hostel1.mp4" },
        { name: "Kukatpally Girls Hostel 1", address: "Kukatpally Address 2", pricing: "₹6000/month", gender: "Girls", amenities: ["AC", "Gym", "Wifi", "Laundry", "Security"], owner: "Jane Smith", directions: "https://www.google.com/maps/place/Landmark+B", rules: "No pets allowed, guests must register", ecoStay: false, reviews: [{ user: "User 6", text: "Comfortable stay.", rating: 4 }, { user: "User 7", text: "Good location.", rating: 5 }, { user: "User 8", text: "Clean and tidy.", rating: 4 }, { user: "User 9", text: "Decent place.", rating: 3 }, { user: "User 10", text: "Enjoyed my stay.", rating: 4 }], hasAC: true, meals: "Lunch and dinner available", specialFeatures: "24/7 security, game room, Swimming Movies at weekend", vacancy: "No", paymentOptions: ["Credit Card", "Net Banking"], image: "img2.jpg", video: "hostel2.mp4" },
        { name: "Ameerpet Boys Hostel 1", address: "Ameerpet Address 1", pricing: "₹5500/month", gender: "Boys", amenities: ["Wifi", "Laundry", "Meals", "Common Room", "Parking"], owner: "David Lee", directions: "https://www.google.com/maps/place/Landmark+C", rules: "Respect quiet hours, keep common areas clean", ecoStay: true, reviews: [{ user: "User 11", text: "Affordable and nice.", rating: 4 }, { user: "User 12", text: "Good facilities.", rating: 5 }, { user: "User 13", text: "Clean rooms.", rating: 4 }, { user: "User 14", text: "Friendly environment.", rating: 5 }, { user: "User 15", text: "Satisfied.", rating: 4 }], hasAC: false, meals: "Breakfast provided", specialFeatures: "Quiet study areas, library access, Swimming Movies at weekend", vacancy: "Yes", paymentOptions: ["UPI", "Cash"], image: "img3.jpg", video: "hostel3.mp4" },
        { name: "Ameerpet Girls Hostel 1", address: "Ameerpet Address 2", pricing: "₹6500/month", gender: "Girls", amenities: ["Meals", "Parking", "Wifi", "AC", "Gym"], owner: "Sarah Kim", directions: "https://www.google.com/maps/place/Landmark+D", rules: "No alcohol, no loud parties", ecoStay: false, reviews: [{ user: "User 16", text: "Excellent place.", rating: 5 }, { user: "User 17", text: "Good service.", rating: 4 }, { user: "User 18",text: "Clean and well-maintained.", rating: 4 }, { user: "User 19", text: "Great value for money.", rating: 5 }, { user: "User 20", text: "Highly recommended.", rating: 4 }], hasAC: true, meals: "All meals included", specialFeatures: "Swimming pool, regular cleaning, Swimming Movies at weekend", vacancy: "Yes", paymentOptions: ["Credit Card", "UPI"], image: "img4.jpg", video: "hostel4.mp4" },
        { name: "Bachupally Boys Hostel 1", address: "Bachupally Address 1", pricing: "₹5200/month", gender: "Boys", amenities: ["Wifi", "Meals", "Gym", "Laundry", "Parking"], owner: "John Doe", directions: "https://www.google.com/maps/place/Landmark+A", rules: "No smoking, quiet hours after 10 PM", ecoStay: true, reviews: [{ user: "User 1", text: "Great place!", rating: 5 }, { user: "User 2", text: "Nice and clean.", rating: 4 }], hasAC: true, meals: "Breakfast and dinner included", specialFeatures: "Rooftop garden, community events", vacancy: "Yes", paymentOptions: ["Credit Card", "UPI", "Cash"], image: "img1.jpg", video: "hostel1.mp4" },
        { name: "Bachupally Girls Hostel 1", address: "Bachupally Address 2", pricing: "₹6200/month", gender: "Girls", amenities: ["AC", "Gym", "Wifi", "Laundry", "Security"], owner: "Jane Smith", directions: "https://www.google.com/maps/place/Landmark+B", rules: "No pets allowed, guests must register", ecoStay: false, reviews: [{ user: "User 6", text: "Comfortable stay.", rating: 4 }, { user: "User 7", text: "Good location.", rating: 5 }], hasAC: true, meals: "Lunch and dinner available", specialFeatures: "24/7 security, game room", vacancy: "No", paymentOptions: ["Credit Card", "Net Banking"], image: "img2.jpg", video: "hostel2.mp4" },
        { name: "Hyderabad Central Hostel 1", address: "Hyderabad Address 1", pricing: "₹6000/month", gender: "Boys", amenities: ["Wifi", "Laundry", "Meals", "Common Room", "Parking"], owner: "David Lee", directions: "https://www.google.com/maps/place/Landmark+C", rules: "Respect quiet hours, keep common areas clean", ecoStay: true, reviews: [{ user: "User 11", text: "Affordable and nice.", rating: 4 }, { user: "User 12", text: "Good facilities.", rating: 5 }], hasAC: false, meals: "Breakfast provided", specialFeatures: "Quiet study areas, library access", vacancy: "Yes", paymentOptions: ["UPI", "Cash"], image: "img3.jpg", video: "hostel3.mp4" },
        { name: "Hyderabad Ladies Hostel 1", address: "Hyderabad Address 2", pricing: "₹7000/month", gender: "Girls", amenities: ["Meals", "Parking", "Wifi", "AC", "Gym"], owner: "Sarah Kim", directions: "https://www.google.com/maps/place/Landmark+D", rules: "No alcohol, no loud parties", ecoStay: false, reviews: [{ user: "User 16", text: "Excellent place.", rating: 5 }, { user: "User 17", text: "Good service.", rating: 4 }], hasAC: true, meals: "All meals included", specialFeatures: "Swimming pool, regular cleaning", vacancy: "Yes", paymentOptions: ["Credit Card", "UPI"], image: "img4.jpg", video: "hostel4.mp4" },
        { name: "Bangalore City Hostel 1", address: "Bangalore Address 1", pricing: "₹7000/month", gender: "Boys", amenities: ["Wifi", "Meals", "Gym", "Laundry", "Parking"], owner: "John Doe", directions: "https://www.google.com/maps/place/Landmark+A", rules: "No smoking, quiet hours after 10 PM", ecoStay: true, reviews: [{ user: "User 1", text: "Great place!", rating: 5 }, { user: "User 2", text: "Nice and clean.", rating: 4 }], hasAC: true, meals: "Breakfast and dinner included", specialFeatures: "Rooftop garden, community events", vacancy: "Yes", paymentOptions: ["Credit Card", "UPI", "Cash"], image: "img1.jpg", video: "hostel1.mp4" },
        { name: "Bangalore Women's Hostel 1", address: "Bangalore Address 2", pricing: "₹8000/month", gender: "Girls", amenities: ["AC", "Gym", "Wifi", "Laundry", "Security"], owner: "Jane Smith", directions: "https://www.google.com/maps/place/Landmark+B", rules: "No pets allowed, guests must register", ecoStay: false, reviews: [{ user: "User 6", text: "Comfortable stay.", rating: 4 }, { user: "User 7", text: "Good location.", rating: 5 }], hasAC: true, meals: "Lunch and dinner available", specialFeatures: "24/7 security, game room", vacancy: "No", paymentOptions: ["Credit Card", "Net Banking"], image: "img2.jpg", video: "hostel2.mp4" },
    ];

    function displayHostels(areaFilter, typeFilter) {
        const hostelList = document.getElementById('hostelList');
        hostelList.innerHTML = '';
        let count = 0;

        hostelData.forEach(hostel => {
            if (count >= 5) return;

            let match = true;
            if (areaFilter && hostel.address.toLowerCase().indexOf(areaFilter.toLowerCase()) === -1) match = false;
            if (typeFilter && hostel.gender !== typeFilter) match = false;

            if (match) {
                const hostelItem = document.createElement('div');
                hostelItem.classList.add('hostel-item');
                hostelItem.innerHTML = `
                    <h3>${hostel.name}</h3>
                    <img src="${hostel.image || 'placeholder.jpg'}" alt="${hostel.name}">
                    <p>Address: ${hostel.address}</p>
                    <p>Pricing: ${hostel.pricing}</p>
                    <p>Gender: ${hostel.gender}</p>
                    <p>AC: ${hostel.hasAC ? 'Yes' : 'No'}</p>
                    <p>Vacancy: ${hostel.vacancy}</p>
                    <p>Payment Options: ${hostel.paymentOptions.join(', ')}</p>
                    <a href="#" class="details-link" data-name="${hostel.name}">Get More Details</a>
                    <button class="booking-button">Confirm Booking</button>
                    <button class="favorite-button">${favorites.includes(hostel.name) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                `;
                hostelList.appendChild(hostelItem);
                count++;
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('favorite-button')) {
            const hostelName = event.target.parentElement.querySelector('h3').textContent;
            if (favorites.includes(hostelName)) {
                favorites = favorites.filter(name => name !== hostelName);
                event.target.textContent = 'Add to Favorites';
            } else {
                favorites.push(hostelName);
                event.target.textContent = 'Remove from Favorites';
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }

        if (event.target.classList.contains('details-link')) {
            const hostelName = event.target.dataset.name;
            const hostel = hostelData.find(h => h.name === hostelName);
            if (hostel) {
                displayHostelDetails(hostel);
            }
        }

        if (event.target.classList.contains('booking-button')) {
            const hostelName = event.target.parentElement.querySelector('h3').textContent;
            const hostel = hostelData.find(h => h.name === hostelName);
            if (hostel) {
                verifyKYC(hostel);
            }
        }

        if (event.target.id === 'closeDetails') {
            hostelDetailsDiv.style.display = 'none';
        }
    });

    function verifyKYC(hostel) {
        const isVerified = confirm("KYC Verification Required. Do you want to proceed with verification?");
        if (isVerified) {
            alert("Please upload your ID for verification.");
            setTimeout(() => {
                const verificationSuccess = confirm("Verification Successful?");
                if (verificationSuccess) {
                    confirmBooking(hostel);
                } else {
                    alert("Verification failed. Booking cannot proceed.");
                }
            }, 3000); // Simulate verification process
        }
    }

    function confirmBooking(hostel) {
        const bookingConfirmed = confirm(`Confirm booking for ${hostel.name}?`);
        if (bookingConfirmed) {
            alert(`Booking confirmed for ${hostel.name}!`);
        } else {
            alert("Booking cancelled.");
        }
    }

    function displayHostelDetails(hostel) {
        hostelDetailsContent.innerHTML = `
            <img src="${hostel.image || 'placeholder.jpg'}" alt="${hostel.name}">
            <p>Address: ${hostel.address}</p>
            <p>Pricing: ${hostel.pricing}</p>
            <p>Gender: ${hostel.gender}</p>
            <p>AC: ${hostel.hasAC ? 'Yes' : 'No'}</p>
            <p>Vacancy: ${hostel.vacancy}</p>
            <p>Payment Options: ${hostel.paymentOptions.join(', ')}</p>
            <p>Amenities: ${hostel.amenities.join(', ')}</p>
            <p>Owner: ${hostel.owner}</p>
            <p>Directions: <a href="${hostel.directions}" target="_blank">Get Directions</a></p>
            <p>Rules: ${hostel.rules}</p>
            <p>Eco Stay: ${hostel.ecoStay ? 'Yes' : 'No'}</p>
            <p>Meals: ${hostel.meals}</p>
            <p>Special Features: ${hostel.specialFeatures}</p>
        `;

        hostelDetailsDiv.style.display = 'block';
    }

    navHomeButton.addEventListener('click', () => {
        hostelResults.style.display = 'none';
        userOptions.style.display = 'none';
        citySelection.style.display = 'none';
        loginContainer.style.display = 'none';
        welcomeContainer.style.display = 'flex';
        navigationBar.style.display = 'none';
    });

    navFavoritesButton.addEventListener('click', () => {
        displayFavorites();
        hostelResults.style.display = 'flex';
        hostelResults.style.alignItems = "normal";
        userOptions.style.display = 'none';
        citySelection.style.display = 'none';
        loginContainer.style.display = 'none';
        welcomeContainer.style.display = 'none';
        navigationBar.style.display = 'flex';
    });

    navBackToCityButton.addEventListener('click', () => {
        citySelection.style.display = 'flex';
        hostelResults.style.display = 'none';
        userOptions.style.display = 'none';
        loginContainer.style.display = 'none';
        welcomeContainer.style.display = 'none';
        navigationBar.style.display = 'none';
    });

    function displayFavorites() {
        const favoriteHostels = hostelData.filter(hostel => favorites.includes(hostel.name));
        hostelList.innerHTML = '';
        let count = 0;

        favoriteHostels.forEach(hostel => {
            if (count >= 5) return;

            const hostelItem = document.createElement('div');
            hostelItem.classList.add('hostel-item');
            hostelItem.innerHTML = `
                <h3>${hostel.name}</h3>
                <img src="${hostel.image || 'placeholder.jpg'}" alt="${hostel.name}">
                <p>Address: ${hostel.address}</p>
                <p>Pricing: ${hostel.pricing}</p>
                <p>Gender: ${hostel.gender}</p>
                <p>AC: ${hostel.hasAC ? 'Yes' : 'No'}</p>
                <p>Vacancy: ${hostel.vacancy}</p>
                <p>Payment Options: ${hostel.paymentOptions.join(', ')}</p>
                <a href="#" class="details-link" data-name="${hostel.name}">Get More Details</a>
                <button class="booking-button">Confirm Booking</button>
                <button class="favorite-button">Remove from Favorites</button>
            `;
            hostelList.appendChild(hostelItem);
            count++;
        });
    }
});