<html vid="0"><head vid="1">
    <meta charset="UTF-8" vid="2">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" vid="3">
    <script src="https://cdn.tailwindcss.com" vid="4"></script>
    <style vid="5">
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
        }
        
        .blur-gradient {
            filter: blur(50px);
            border-radius: 50%;
        }
        
        .playback-controls button {
            transition: all 0.2s ease;
        }
        
        .playback-controls button:active {
            transform: scale(0.95);
        }
        
        .time-ruler {
            background-image: repeating-linear-gradient(
                to right,
                rgba(0, 0, 0, 0.15),
                rgba(0, 0, 0, 0.15) 1px,
                transparent 1px,
                transparent 10px
            );
        }
    </style>
</head>
<body class="bg-[#E3EEEC]" vid="6">
    <div class="relative w-full max-w-md mx-auto h-screen overflow-hidden" vid="7">
        <div class="h-full w-full bg-[#E3EEEC] p-6 pt-14 flex flex-col" vid="8">
            <!-- Header -->
            <div class="flex justify-between items-start mb-1" vid="9">
                <div vid="10">
                    <h1 class="text-black text-2xl font-semibold" vid="11">Journey</h1>
                    <h2 class="text-[#7A8D89] text-xl" vid="12">Audio Guides</h2>
                    <p class="text-[#7A8D89] text-base" vid="13">Sofia Martinez</p>
                </div>
                <button class="text-black" vid="14">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" vid="15">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" vid="16"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Visualization Area -->
            <div class="relative flex-grow flex items-center justify-center my-4" vid="17">
                <div class="absolute w-48 h-48 bg-[#FFD700] opacity-80 blur-gradient" vid="18"></div>
                <div class="absolute w-48 h-48 bg-[#FF6347] opacity-70 blur-gradient" style="transform: translateX(-20px) translateY(-20px);" vid="19"></div>
            </div>
            
            <!-- Playback Time -->
            <div class="flex justify-between text-[#7A8D89] text-sm mb-2" vid="20">
                <div vid="21">00:<span class="font-medium" vid="22">00:00</span></div>
                <div vid="23">01:<span class="font-medium" vid="24">45:30</span></div>
            </div>
            
            <!-- Playback Controls -->
            <div class="playback-controls grid grid-cols-3 gap-4 mb-4" vid="25">
                <button class="bg-[#D9E6E3] p-4 rounded-md flex justify-center items-center" vid="26">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" vid="27">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" vid="28"></path>
                    </svg>
                </button>
                <button class="bg-[#D9E6E3] p-4 rounded-md flex justify-center items-center" vid="29">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" vid="30">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" vid="31"></path>
                    </svg>
                </button>
                <button class="bg-[#D9E6E3] p-4 rounded-md flex justify-center items-center" vid="32">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" vid="33">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" vid="34"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Time Ruler -->
            <div class="time-ruler h-8 w-full rounded-md" vid="35"></div>
            
            <!-- Travel Guide Info -->
            <div class="mt-6 space-y-4" vid="36">
                <div class="bg-[#D9E6E3] p-4 rounded-md" vid="37">
                    <h3 class="font-medium text-black" vid="38">Paris Walking Tour</h3>
                    <p class="text-[#7A8D89] text-sm" vid="39">Explore the hidden gems of Montmartre with this audio guide.</p>
                </div>
                
                <div class="bg-[#D9E6E3] p-4 rounded-md" vid="40">
                    <h3 class="font-medium text-black" vid="41">Tokyo Highlights</h3>
                    <p class="text-[#7A8D89] text-sm" vid="42">Discover the contrast between traditional and modern Tokyo.</p>
                </div>
                
                <div class="bg-[#D9E6E3] p-4 rounded-md" vid="43">
                    <h3 class="font-medium text-black" vid="44">New York City Secrets</h3>
                    <p class="text-[#7A8D89] text-sm" vid="45">Local insights about NYC that most tourists never discover.</p>
                </div>
            </div>
        </div>
    </div>

</body></html>
