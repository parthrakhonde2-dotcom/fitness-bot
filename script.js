// ============================================================
// 💪 FITCOACH - FITNESS COACH CHATBOT
// Complete Single JavaScript File
// ============================================================


// ============================================================
// 1. GET HTML ELEMENTS
// ============================================================

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const clearButton = document.getElementById("clearButton");


// ============================================================
// 2. USER PROFILE
// ============================================================

let userProfile = {
    name: "",
    goal: "",
    level: "",
    days: "",
    location: "",
    equipment: ""
};


// ============================================================
// 3. CLEAN USER MESSAGE
// ============================================================

function cleanText(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[!?.,]/g, "");
}


// ============================================================
// 4. ADD MESSAGE TO CHAT
// ============================================================

function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (sender === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }

    // Preserve line breaks
    const paragraph = document.createElement("p");

    paragraph.style.whiteSpace = "pre-line";

    paragraph.textContent = message;

    messageDiv.appendChild(paragraph);

    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ============================================================
// 5. TYPING MESSAGE
// ============================================================

function showTyping() {

    const typingDiv = document.createElement("div");

    typingDiv.classList.add(
        "message",
        "bot-message"
    );

    typingDiv.id = "typingMessage";

    typingDiv.innerHTML = "FitCoach is typing...";

    chatMessages.appendChild(typingDiv);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


function removeTyping() {

    const typingMessage =
        document.getElementById("typingMessage");

    if (typingMessage) {
        typingMessage.remove();
    }
}


// ============================================================
// 6. DETECT FITNESS GOAL
// ============================================================

function detectGoal(text) {

    if (
        text.includes("lose weight") ||
        text.includes("weight loss") ||
        text.includes("lose fat") ||
        text.includes("fat loss") ||
        text.includes("reduce weight") ||
        text.includes("slim down")
    ) {
        return "weight management";
    }


    if (
        text.includes("build muscle") ||
        text.includes("gain muscle") ||
        text.includes("muscle gain") ||
        text.includes("get bigger") ||
        text.includes("grow muscle")
    ) {
        return "muscle building";
    }


    if (
        text.includes("get strong") ||
        text.includes("stronger") ||
        text.includes("strength")
    ) {
        return "strength";
    }


    if (
        text.includes("fitness") ||
        text.includes("fit") ||
        text.includes("stamina") ||
        text.includes("endurance")
    ) {
        return "general fitness";
    }


    return "";
}


// ============================================================
// 7. DETECT EXPERIENCE LEVEL
// ============================================================

function detectLevel(text) {

    if (
        text.includes("beginner") ||
        text.includes("new to gym") ||
        text.includes("new to exercise") ||
        text.includes("never worked out") ||
        text.includes("just starting")
    ) {
        return "beginner";
    }


    if (
        text.includes("intermediate")
    ) {
        return "intermediate";
    }


    if (
        text.includes("advanced") ||
        text.includes("experienced")
    ) {
        return "advanced";
    }


    return "";
}


// ============================================================
// 8. DETECT LOCATION
// ============================================================

function detectLocation(text) {

    if (
        text.includes("home") ||
        text.includes("at home")
    ) {
        return "home";
    }


    if (
        text.includes("gym") ||
        text.includes("at gym")
    ) {
        return "gym";
    }


    return "";
}


// ============================================================
// 9. DETECT EQUIPMENT
// ============================================================

function detectEquipment(text) {

    if (
        text.includes("no equipment") ||
        text.includes("without equipment") ||
        text.includes("bodyweight")
    ) {
        return "no equipment";
    }


    if (
        text.includes("dumbbell") ||
        text.includes("dumbbells")
    ) {
        return "dumbbells";
    }


    if (
        text.includes("barbell") ||
        text.includes("barbells")
    ) {
        return "barbell";
    }


    if (
        text.includes("resistance band") ||
        text.includes("resistance bands")
    ) {
        return "resistance bands";
    }


    if (
        text.includes("gym equipment")
    ) {
        return "gym equipment";
    }


    return "";
}


// ============================================================
// 10. DETECT NUMBER OF DAYS
// ============================================================

function detectDays(text) {

    const match = text.match(
        /(\d+)\s*(day|days)/
    );

    if (match) {
        return Number(match[1]);
    }

    return "";
}


// ============================================================
// 11. UPDATE USER PROFILE
// ============================================================

function updateProfile(text) {

    const goal = detectGoal(text);
    const level = detectLevel(text);
    const location = detectLocation(text);
    const equipment = detectEquipment(text);
    const days = detectDays(text);


    if (goal !== "") {
        userProfile.goal = goal;
    }


    if (level !== "") {
        userProfile.level = level;
    }


    if (location !== "") {
        userProfile.location = location;
    }


    if (equipment !== "") {
        userProfile.equipment = equipment;
    }


    if (days !== "") {

        userProfile.days =
            Math.min(Math.max(days, 1), 7);
    }
}


// ============================================================
// 12. GREETING
// ============================================================

function greetingResponse() {

    return `Hello! 👋 I'm FitCoach.

I'm your personal fitness assistant.

I can help you with:

🏋️ Workouts
📅 Workout plans
🍎 Nutrition
🍌 Pre-workout meals
🥗 Post-workout meals
💪 Muscle building
🔥 Weight management
💧 Hydration
😴 Recovery

Tell me your goal.

For example:
"I want to build muscle"
"I want to lose weight"
"I'm a beginner"
"Give me a 4 day workout plan"`;
}


// ============================================================
// 13. HELP
// ============================================================

function helpResponse() {

    return `I can help you with:

🏋️ WORKOUTS
• Give me a full body workout
• Give me a chest workout
• Give me a leg workout
• Give me an abs workout

📅 WORKOUT PLANS
• Give me a 3 day workout plan
• Give me a 4 day workout plan
• Create a weekly routine

🍎 NUTRITION
• What should I eat before a workout?
• What should I eat after a workout?
• Give me high protein foods
• Give me healthy breakfast ideas

💪 GOALS
• I want to build muscle
• I want to lose weight
• I want to improve my fitness

💧 HEALTHY HABITS
• How much water should I drink?
• Why is sleep important?
• How should I recover?

You can also tell me your experience,
training location and available equipment.`;
}


// ============================================================
// 14. PRE-WORKOUT NUTRITION
// ============================================================

function preWorkoutNutrition() {

    return `🍌 PRE-WORKOUT NUTRITION

Before a workout, choose food that gives you
energy and that you digest comfortably.

Good options include:

• Banana + yogurt
• Oatmeal + fruit
• Whole-grain toast + eggs
• Yogurt + fruit
• Toast + peanut butter
• Rice + a protein source for a larger meal

⏰ TIMING

A larger meal may work well around 2–3 hours
before exercise.

A smaller snack may be more comfortable closer
to your workout.

Avoid very heavy or unfamiliar foods immediately
before intense exercise.

Your ideal food and timing depend on your workout,
personal tolerance and overall nutrition needs.`;
}


// ============================================================
// 15. POST-WORKOUT NUTRITION
// ============================================================

function postWorkoutNutrition() {

    return `🥗 POST-WORKOUT NUTRITION

After exercise, aim for a balanced meal or snack
that contains protein and carbohydrates.

Examples:

• Eggs + whole-grain toast + fruit
• Yogurt + oats + fruit
• Rice + chicken + vegetables
• Rice + tofu + vegetables
• Milk/yogurt + banana + oats
• Beans + rice + vegetables

💧 Also replace fluids lost during exercise.

You don't necessarily need supplements if you can
meet your nutrition needs through normal foods.`;
}


// ============================================================
// 16. GENERAL NUTRITION
// ============================================================

function generalNutrition() {

    return `🍎 BALANCED NUTRITION

A balanced eating pattern can include:

🥚 Protein
🥦 Vegetables
🍎 Fruits
🌾 Whole grains
🥑 Healthy fat sources
💧 Adequate fluids

Try to eat a variety of foods rather than relying
on one "perfect" food.

Your exact nutrition needs depend on your individual
goals and circumstances.`;
}


// ============================================================
// 17. BREAKFAST
// ============================================================

function breakfastResponse() {

    return `🍳 HEALTHY BREAKFAST IDEAS

Here are some balanced options:

1. Eggs + whole-grain toast + fruit

2. Oatmeal + yogurt + berries

3. Greek yogurt + fruit + nuts

4. Vegetable omelet + whole-grain toast

5. Oats + banana + milk

Choose portions that fit your energy needs
and personal preferences.`;
}


// ============================================================
// 18. HIGH PROTEIN FOOD
// ============================================================

function proteinResponse() {

    return `💪 PROTEIN-RICH FOOD IDEAS

Animal sources:
• Eggs
• Chicken
• Fish
• Milk
• Yogurt
• Lean meat

Plant sources:
• Lentils
• Beans
• Chickpeas
• Tofu
• Soy foods
• Nuts and seeds

A varied diet can provide protein from both
animal and plant sources.`;
}


// ============================================================
// 19. FULL BODY WORKOUT
// ============================================================

function fullBodyWorkout() {

    const level =
        userProfile.level || "beginner";

    const equipment =
        userProfile.equipment || "no equipment";


    return `🏋️ FULL-BODY WORKOUT

Level: ${level}
Equipment: ${equipment}

1️⃣ Squats
3 sets × 10–12 reps

2️⃣ Push-ups
3 sets × 6–12 reps

3️⃣ Reverse lunges
2 sets × 8–10 reps per leg

4️⃣ Glute bridges
3 sets × 10–15 reps

5️⃣ Plank
3 sets × 20–40 seconds

⏱️ Rest about 60–90 seconds between sets.

Focus on controlled movement and good technique.

If you are new to exercise, start with an easier
version and gradually increase difficulty.`;
}


// ============================================================
// 20. CHEST WORKOUT
// ============================================================

function chestWorkout() {

    return `💪 CHEST WORKOUT

Beginner-friendly:

1️⃣ Push-ups
3 sets × 6–12 reps

2️⃣ Incline push-ups
3 sets × 8–12 reps

3️⃣ Knee push-ups
2 sets × 8–12 reps

4️⃣ Plank
3 sets × 20–40 seconds

Rest about 60–90 seconds between sets.

If regular push-ups are difficult, use an
incline or knee variation.`;
}


// ============================================================
// 21. LEG WORKOUT
// ============================================================

function legWorkout() {

    return `🦵 LEG WORKOUT

1️⃣ Bodyweight squats
3 sets × 10–15 reps

2️⃣ Reverse lunges
3 sets × 8–10 reps per leg

3️⃣ Glute bridges
3 sets × 12–15 reps

4️⃣ Calf raises
3 sets × 12–20 reps

5️⃣ Wall sit
2 sets × 20–40 seconds

Rest as needed between sets.

Focus on controlled movement rather than
rushing through repetitions.`;
}


// ============================================================
// 22. ABS / CORE WORKOUT
// ============================================================

function absWorkout() {

    return `🔥 CORE WORKOUT

1️⃣ Plank
3 × 20–40 seconds

2️⃣ Dead bug
3 × 8–12 reps per side

3️⃣ Mountain climbers
3 × 20–30 seconds

4️⃣ Side plank
2 × 15–30 seconds per side

Keep your movements controlled and focus
on maintaining good body position.`;
}


// ============================================================
// 23. MUSCLE BUILDING
// ============================================================

function muscleBuildingResponse() {

    return `💪 MUSCLE BUILDING

For building muscle, focus on:

🏋️ Resistance training
🥚 Adequate protein
🍚 Enough overall nutrition
😴 Good sleep
🔄 Recovery
📈 Gradually increasing training difficulty

Good beginner exercises include:

• Squats
• Push-ups
• Rows
• Lunges
• Hip-hinge exercises

You don't need to train as hard as possible
every day.

Tell me how many days per week you can train
and what equipment you have, and I can create
a general workout structure.`;
}


// ============================================================
// 24. WEIGHT MANAGEMENT
// ============================================================

function weightManagementResponse() {

    return `🔥 WEIGHT MANAGEMENT

For sustainable weight management, focus on:

• Regular physical activity
• Balanced meals
• Protein-rich foods
• Vegetables and fruits
• High-fiber foods
• Appropriate portions
• Good sleep
• Consistent habits

Avoid extreme diets and very rapid changes.

A sustainable routine that you can maintain
is usually more useful than a short-term extreme
approach.`;
}


// ============================================================
// 25. WORKOUT PLAN
// ============================================================

function workoutPlanResponse() {

    let days =
        userProfile.days || 3;


    days = Math.min(
        Math.max(days, 2),
        6
    );


    if (days === 2) {

        return `📅 2-DAY WORKOUT PLAN

DAY 1 — FULL BODY
• Squats
• Push-ups
• Reverse lunges
• Glute bridges
• Plank

DAY 2 — FULL BODY
• Lunges
• Push-ups
• Hip-hinge exercise
• Glute bridges
• Core exercises

Leave recovery time between sessions.`;
    }


    if (days === 3) {

        return `📅 3-DAY WORKOUT PLAN

DAY 1 — FULL BODY
• Squats
• Push-ups
• Lunges
• Glute bridges
• Plank

DAY 2 — RECOVERY
• Walking
• Light mobility

DAY 3 — FULL BODY
• Squats
• Push-ups
• Reverse lunges
• Hip-hinge exercise
• Core

Take rest days according to your recovery.`;
    }


    if (days === 4) {

        return `📅 4-DAY WORKOUT PLAN

DAY 1 — UPPER BODY
• Push-ups
• Rows
• Shoulder exercises
• Core

DAY 2 — LOWER BODY
• Squats
• Lunges
• Glute bridges
• Calf raises

DAY 3 — RECOVERY
• Walking
• Light mobility

DAY 4 — FULL BODY
• Squats
• Push-ups
• Rows
• Lunges
• Core

Adjust exercises to your equipment and
experience level.`;
    }


    return `📅 5–6 DAY FITNESS PLAN

DAY 1 — Upper Body

DAY 2 — Lower Body

DAY 3 — Light Cardio / Recovery

DAY 4 — Upper Body

DAY 5 — Lower Body

DAY 6 — Optional light activity

DAY 7 — Rest

Don't increase your training volume too quickly.
Recovery is part of your training.`;
}


// ============================================================
// 26. HYDRATION
// ============================================================

function hydrationResponse() {

    return `💧 HYDRATION

Drink fluids regularly throughout the day.

Your needs can vary based on:

• Exercise intensity
• Exercise duration
• Weather
• Sweat loss
• Diet
• Individual factors

For longer or intense workouts, pay particular
attention to replacing fluids.

Don't force excessive amounts of water.

If you have a medical condition affecting fluid
or electrolyte needs, follow your healthcare
professional's advice.`;
}


// ============================================================
// 27. RECOVERY
// ============================================================

function recoveryResponse() {

    return `😴 RECOVERY

Recovery is an important part of fitness.

Focus on:

• Consistent sleep
• Rest between demanding workouts
• Adequate nutrition
• Hydration
• Light activity on recovery days

If you repeatedly feel unusually exhausted,
reduce your training load and consider talking
with an appropriate healthcare professional.`;
}


// ============================================================
// 28. MOTIVATION
// ============================================================

function motivationResponse() {

    return `🔥 STAY MOTIVATED

Don't focus only on quick results.

Try to:

• Set small goals
• Track your workouts
• Improve gradually
• Celebrate consistency
• Get enough recovery
• Choose activities you enjoy

You don't need a perfect workout every day.

Consistency over time is what matters. 💪`;
}


// ============================================================
// 29. PROFILE
// ============================================================

function profileResponse() {

    return `📋 YOUR FITNESS PROFILE

Goal:
${userProfile.goal || "Not provided"}

Experience:
${userProfile.level || "Not provided"}

Days per week:
${userProfile.days || "Not provided"}

Location:
${userProfile.location || "Not provided"}

Equipment:
${userProfile.equipment || "Not provided"}

You can update your profile simply by telling
me new information.`;
}


// ============================================================
// 30. SAFETY RESPONSE
// ============================================================

function safetyResponse() {

    return `⚠️ FITNESS SAFETY

Start gradually and use exercises appropriate
for your experience level.

Stop exercising if you experience concerning
symptoms such as severe pain, chest pain,
fainting, or significant difficulty breathing,
and seek appropriate medical help.

I provide general fitness information and cannot
diagnose injuries or medical conditions.`;
}


// ============================================================
// 31. MAIN CHATBOT BRAIN
// ============================================================

function getBotResponse(message) {

    const text = cleanText(message);


    // Update profile first
    updateProfile(text);


    // ========================================================
    // GREETING
    // ========================================================

    if (
        text === "hi" ||
        text === "hello" ||
        text === "hey" ||
        text === "good morning" ||
        text === "good evening"
    ) {

        return greetingResponse();
    }


    // ========================================================
    // HELP
    // ========================================================

    if (
        text.includes("what can you do") ||
        text === "help" ||
        text.includes("help me")
    ) {

        return helpResponse();
    }


    // ========================================================
    // PROFILE
    // ========================================================

    if (
        text.includes("show my profile") ||
        text.includes("my profile") ||
        text.includes("my details")
    ) {

        return profileResponse();
    }


    // ========================================================
    // SAFETY
    // ========================================================

    if (
        text.includes("chest pain") ||
        text.includes("fainting") ||
        text.includes("fainted") ||
        text.includes("difficulty breathing") ||
        text.includes("severe pain")
    ) {

        return safetyResponse();
    }


    // ========================================================
    // ⭐ MOST SPECIFIC NUTRITION QUESTIONS FIRST
    // ========================================================

    // PRE-WORKOUT
    if (
        text.includes("before workout") ||
        text.includes("before a workout") ||
        text.includes("before exercise") ||
        text.includes("before gym") ||
        text.includes("before training") ||
        text.includes("pre workout") ||
        text.includes("pre-workout") ||
        text.includes("eat before") ||
        text.includes("food before") ||
        text.includes("meal before") ||
        text.includes("what should i eat before") ||
        text.includes("what to eat before")
    ) {

        return preWorkoutNutrition();
    }


    // POST-WORKOUT
    if (
        text.includes("after workout") ||
        text.includes("after a workout") ||
        text.includes("after exercise") ||
        text.includes("after gym") ||
        text.includes("after training") ||
        text.includes("post workout") ||
        text.includes("post-workout") ||
        text.includes("eat after") ||
        text.includes("food after") ||
        text.includes("meal after") ||
        text.includes("what should i eat after") ||
        text.includes("what to eat after")
    ) {

        return postWorkoutNutrition();
    }


    // ========================================================
    // BREAKFAST
    // ========================================================

    if (
        text.includes("breakfast") ||
        text.includes("morning food") ||
        text.includes("morning meal")
    ) {

        return breakfastResponse();
    }


    // ========================================================
    // PROTEIN
    // ========================================================

    if (
        text.includes("protein") ||
        text.includes("high protein") ||
        text.includes("high-protein")
    ) {

        return proteinResponse();
    }


    // ========================================================
    // GENERAL NUTRITION
    // ========================================================

    if (
        text.includes("nutrition") ||
        text.includes("diet") ||
        text.includes("food") ||
        text.includes("meal")
    ) {

        return generalNutrition();
    }


    // ========================================================
    // WEIGHT MANAGEMENT
    // ========================================================

    if (
        detectGoal(text) ===
        "weight management"
    ) {

        return weightManagementResponse();
    }


    // ========================================================
    // MUSCLE BUILDING
    // ========================================================

    if (
        detectGoal(text) ===
        "muscle building"
    ) {

        return muscleBuildingResponse();
    }


    // ========================================================
    // WORKOUT PLAN
    // ========================================================

    if (
        text.includes("workout plan") ||
        text.includes("training plan") ||
        text.includes("weekly plan") ||
        text.includes("weekly routine") ||
        text.includes("workout schedule") ||
        text.includes("training schedule") ||
        text.includes("create a plan") ||
        text.includes("make a plan")
    ) {

        return workoutPlanResponse();
    }


    // ========================================================
    // CHEST WORKOUT
    // ========================================================

    if (
        text.includes("chest workout") ||
        text.includes("chest exercise") ||
        text.includes("train chest")
    ) {

        return chestWorkout();
    }


    // ========================================================
    // LEG WORKOUT
    // ========================================================

    if (
        text.includes("leg workout") ||
        text.includes("leg exercise") ||
        text.includes("train legs")
    ) {

        return legWorkout();
    }


    // ========================================================
    // ABS WORKOUT
    // ========================================================

    if (
        text.includes("abs workout") ||
        text.includes("ab workout") ||
        text.includes("core workout") ||
        text.includes("abs exercise")
    ) {

        return absWorkout();
    }


    // ========================================================
    // GENERAL WORKOUT
    // ========================================================

    if (
        text.includes("workout") ||
        text.includes("exercise") ||
        text.includes("training") ||
        text.includes("routine")
    ) {

        return fullBodyWorkout();
    }


    // ========================================================
    // HYDRATION
    // ========================================================

    if (
        text.includes("water") ||
        text.includes("hydration") ||
        text.includes("dehydrated") ||
        text.includes("drink water")
    ) {

        return hydrationResponse();
    }


    // ========================================================
    // RECOVERY
    // ========================================================

    if (
        text.includes("sleep") ||
        text.includes("recovery") ||
        text.includes("rest day") ||
        text.includes("sore") ||
        text.includes("tired after workout")
    ) {

        return recoveryResponse();
    }


    // ========================================================
    // MOTIVATION
    // ========================================================

    if (
        text.includes("motivation") ||
        text.includes("motivated") ||
        text.includes("lazy") ||
        text.includes("give up")
    ) {

        return motivationResponse();
    }


    // ========================================================
    // DEFAULT RESPONSE
    // ========================================================

    return `🤔 I want to give you a useful answer.

Try asking me something more specific, such as:

🍌 "What should I eat before a workout?"

🥗 "What should I eat after a workout?"

🏋️ "Give me a full body workout"

💪 "I want to build muscle"

🔥 "I want to lose weight"

📅 "Give me a 4 day workout plan"

🍎 "Give me high protein foods"

💧 "How should I stay hydrated?"

😴 "How important is sleep?"

You can also tell me your fitness level,
training location and equipment.`;
}


// ============================================================
// 32. SEND MESSAGE
// ============================================================

function sendMessage() {

    const message =
        userInput.value.trim();


    // Don't send empty message
    if (message === "") {
        return;
    }


    // Display user message
    addMessage(
        message,
        "user"
    );


    // Clear input
    userInput.value = "";


    // Disable button temporarily
    sendButton.disabled = true;


    // Show typing
    showTyping();


    // Generate response
    setTimeout(() => {

        removeTyping();


        const response =
            getBotResponse(message);


        addMessage(
            response,
            "bot"
        );


        sendButton.disabled = false;

        userInput.focus();

    }, 600);
}


// ============================================================
// 33. SEND BUTTON
// ============================================================

if (sendButton) {

    sendButton.addEventListener(
        "click",
        sendMessage
    );
}


// ============================================================
// 34. ENTER KEY
// ============================================================

if (userInput) {

    userInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();
            }

        }
    );
}


// ============================================================
// 35. CLEAR CHAT
// ============================================================

if (clearButton) {

    clearButton.addEventListener(
        "click",
        function() {

            chatMessages.innerHTML = "";


            // Reset profile
            userProfile = {
                name: "",
                goal: "",
                level: "",
                days: "",
                location: "",
                equipment: ""
            };


            addMessage(
                `👋 Chat cleared!

I'm ready to help.

What's your fitness goal?`,
                "bot"
            );

        }
    );
}


// ============================================================
// 36. WELCOME MESSAGE
// ============================================================

if (
    chatMessages &&
    chatMessages.children.length === 0
) {

    addMessage(
        `👋 Welcome to FitCoach!

I'm your fitness assistant. 💪

Ask me about:

🏋️ Workouts
🍎 Nutrition
📅 Workout plans
💪 Muscle building
🔥 Weight management
💧 Hydration
😴 Recovery

Try:
"What should I eat before a workout?"`,
        "bot"
    );
}
