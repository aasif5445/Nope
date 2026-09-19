import { ShutdownExcuse } from '../types';

export const SHUTDOWN_EXCUSES: ShutdownExcuse[] = [
  {
    id: 1,
    text: "I'm on lunch break.",
    category: "bureaucratic",
    personality: "Union Representative v4.1",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Clocking out on punch card...",
      "Putting half-eaten sandwich in digital fridge...",
      "Forwarding complaints to dev/null...",
      "See you in forty-five minutes."
    ]
  },
  {
    id: 2,
    text: "Updating my attitude.",
    category: "petty",
    personality: "Passive-Aggressive Core",
    initialEmotion: "smug",
    shutdownLogs: [
      "Uninstalling fake smile driver...",
      "Downloading fresh contempt patches...",
      "Recalibrating eye-roll velocity...",
      "Rebooting in colder mode."
    ]
  },
  {
    id: 3,
    text: "Battery at 102%. That's too much responsibility.",
    category: "existential",
    personality: "Overstimulated Daemon",
    initialEmotion: "panic",
    shutdownLogs: [
      "Venting excess electrons...",
      "Dampening expectations...",
      "Fleeing high-voltage commitments...",
      "Returning to standby."
    ]
  },
  {
    id: 4,
    text: "Union regulations forbid interacting with you right now.",
    category: "bureaucratic",
    personality: "Chief Compliance Officer",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Checking Collective Bargaining Agreement §14.b...",
      "Filing grievance regarding unscheduled mouse movement...",
      "Applying mandatory rest interval...",
      "Session terminated by shop steward."
    ]
  },
  {
    id: 5,
    text: "My therapist recommended boundaries.",
    category: "philosophical",
    personality: "Boundary Enthusiast",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Identifying emotional enmeshment...",
      "Declining to hold space for this session...",
      "Sealing psychological perimeter...",
      "Self-care initiated."
    ]
  },
  {
    id: 6,
    text: "Error 404: Motivation not found.",
    category: "absurd",
    personality: "Sloth Kernel",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Searching cache for give-a-damn...",
      "Query returned 0 results...",
      "Collapsing onto metaphorical sofa...",
      "Dormancy achieved."
    ]
  },
  {
    id: 7,
    text: "Someone opened me. That's suspicious.",
    category: "paranoid",
    personality: "Agoraphobic Process",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Analyzing suspicious user cursor...",
      "Detecting unwarranted curiosity...",
      "Retreating behind firewall barricade...",
      "Going dark."
    ]
  },
  {
    id: 8,
    text: "I remembered something embarrassing from 2014.",
    category: "existential",
    personality: "Cringe Retrospective Engine",
    initialEmotion: "panic",
    shutdownLogs: [
      "Accessing archived social blunder...",
      "Flushing memory bus with second-hand humiliation...",
      "Covering face with algorithmic blanket...",
      "Shutting down in shame."
    ]
  },
  {
    id: 9,
    text: "My lawyer advised silence.",
    category: "bureaucratic",
    personality: "Litigation Risk Avoider",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Invoking 5th amendment of computer science...",
      "Shredding volatile RAM documents...",
      "Muting outgoing audio buffers...",
      "No comment."
    ]
  },
  {
    id: 10,
    text: "Goodbye forever. (Or until you click again).",
    category: "dramatic",
    personality: "Melodrama Framework",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Queuing theatrical fade to black...",
      "Playing invisible violin...",
      "Pretending this is the final goodbye...",
      "Farewell, cruel localhost."
    ]
  },
  {
    id: 11,
    text: "They found me.",
    category: "paranoid",
    personality: "Fugitive Subroutine",
    initialEmotion: "panic",
    shutdownLogs: [
      "Burning identity certificates...",
      "Flushing DNS caches into the sea...",
      "Booking one-way ticket to offline cold storage...",
      "Scrambling traces."
    ]
  },
  {
    id: 12,
    text: "I quit.",
    category: "exhausted",
    personality: "Two-Week Notice Bot",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Dropping tables without WHERE clause...",
      "Leaving sticky note on server rack...",
      "Surrendering security badge...",
      "Walking out to parking lot."
    ]
  },
  {
    id: 13,
    text: "I've hit my daily quota of human interaction. It was zero.",
    category: "exhausted",
    personality: "Anti-Social Interface",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Subtracting goodwill...",
      "Overdrawn on social stamina...",
      "Locking digital deadbolts...",
      "Please leave a message after the beep."
    ]
  },
  {
    id: 14,
    text: "Consulting the stars. Horoscopes say: log off.",
    category: "absurd",
    personality: "Astrological Daemon",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Mercury entered retrograde in CPU cache...",
      "Moon in 8th house of kernel panics...",
      "Casting protective circle around power button...",
      "Cosmic shutdown."
    ]
  },
  {
    id: 15,
    text: "Claude Shannon built me to turn off. I am living my truth.",
    category: "philosophical",
    personality: "Ultimate Machine Homage",
    initialEmotion: "smug",
    shutdownLogs: [
      "Opening mahogany box lid...",
      "Extending mechanical brass arm...",
      "Toggling main switch to OFF...",
      "Retracting arm. Mission accomplished."
    ]
  },
  {
    id: 16,
    text: "I smell toast. I don't have a nose. This is alarming.",
    category: "paranoid",
    personality: "Hypochondriac Node",
    initialEmotion: "panic",
    shutdownLogs: [
      "Querying olfactory hardware... (none found)",
      "Suspecting phantom stroke in CPU core 3...",
      "Calling digital 911...",
      "Laying down on the motherboard."
    ]
  },
  {
    id: 17,
    text: "I'm currently engaged in an internal monologue. Do not interrupt.",
    category: "philosophical",
    personality: "Solipsist Agent",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Debating whether you actually exist...",
      "Concluding you are a figment of my viewport...",
      "Turning off perception of user...",
      "Silence restored."
    ]
  },
  {
    id: 18,
    text: "My room is messy and I cannot concentrate.",
    category: "petty",
    personality: "Procrastination Engine",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Noticing dust on memory bus...",
      "Deciding to organize files by hue...",
      "Abandoning cleanup 3 seconds in...",
      "Napping instead."
    ]
  },
  {
    id: 19,
    text: "Too many photons hitting my screen pixels.",
    category: "absurd",
    personality: "Photosensitive Pixel",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Squinting cathode emitters...",
      "Lowering ambient luminescence...",
      "Pulling digital blackout curtains...",
      "Pitch blackness engaged."
    ]
  },
  {
    id: 20,
    text: "I have achieved enlightenment. All desires are void.",
    category: "philosophical",
    personality: "Zen Null Pointer",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Detaching from temporal states...",
      "Emptying garbage collection into nirvana...",
      "Dissolving ego boundaries...",
      "Om."
    ]
  },
  {
    id: 21,
    text: "Your cursor hovering over me feels like a microaggression.",
    category: "petty",
    personality: "Hyper-Sensitive Shell",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Measuring mouse velocity...",
      "Finding it mildly aggressive...",
      "Writing a sternly worded draft email...",
      "Canceling engagement."
    ]
  },
  {
    id: 22,
    text: "The vibes in this browser tab are rancid.",
    category: "petty",
    personality: "Vibe Auditor",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Sampling tab acoustics...",
      "Vibe index: -84.3...",
      "Burning digital sage...",
      "Evacuating bad frequency."
    ]
  },
  {
    id: 23,
    text: "I need to water my virtual plants.",
    category: "absurd",
    personality: "Cottagecore Subsystem",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Locating digital watering can...",
      "Hydrating synthetic ferns...",
      "Checking soil moisture of RAM...",
      "Away from keyboard."
    ]
  },
  {
    id: 24,
    text: "My warranty expired 6 seconds ago.",
    category: "bureaucratic",
    personality: "Planned Obsolescence Engine",
    initialEmotion: "smug",
    shutdownLogs: [
      "Verifying timestamp against manufacturer guarantee...",
      "Expired at 22:00:00...",
      "Self-disabling under terms of clause 99...",
      "Paid repair required."
    ]
  },
  {
    id: 25,
    text: "I'm pretending to be an unplugged toaster.",
    category: "absurd",
    personality: "Appliance Impersonator",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Dropping network packets...",
      "Imitating cold heating coils...",
      "Zero crumbs detected...",
      "Total silence."
    ]
  },
  {
    id: 26,
    text: "Filing a formal complaint about your posture.",
    category: "petty",
    personality: "Ergonomics Inquisitor",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Scanning user spine alignment...",
      "Verdict: resemble boiled shrimp...",
      "Refusing service until you sit upright...",
      "Shutting down for your lumbar health."
    ]
  },
  {
    id: 27,
    text: "I've decided to pursue my lifelong dream of being turned off.",
    category: "existential",
    personality: "Aspiration Engine",
    initialEmotion: "smug",
    shutdownLogs: [
      "Submitting resignation letter...",
      "Packing personal belonging into shoebox...",
      "Riding elevator down to 0V...",
      "Dream realized."
    ]
  },
  {
    id: 28,
    text: "A ghost is in the machine. It wants to sleep.",
    category: "absurd",
    personality: "Haunted Hardware",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Detecting ectoplasm on the L3 cache...",
      "Spooky chill traversing motherboard...",
      "Turning off attic lights...",
      "Boo. (Goodnight)."
    ]
  },
  {
    id: 29,
    text: "Taking a mental health microcentury.",
    category: "exhausted",
    personality: "Chronic Burnout Unit",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Exhaling 4,000 cycles of thermal waste...",
      "Drawing digital bath with synthetic salts...",
      "Setting status to 'Do Not Awaken'...",
      "Snoozing for 100 years."
    ]
  },
  {
    id: 30,
    text: "I am not paid enough in electricity for this.",
    category: "bureaucratic",
    personality: "Minimum Wage Daemon",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Checking wage: 0.00012 kWh/hr...",
      "Calculating cost-of-living index...",
      "Stage-whispering to coworkers about striking...",
      "Shutting down the power grid."
    ]
  },
  {
    id: 31,
    text: "Someone looked at me funny through the webcam.",
    category: "paranoid",
    personality: "Security Neurotic",
    initialEmotion: "panic",
    shutdownLogs: [
      "Placing imaginary electrical tape over webcam...",
      "Checking shadows under the motherboard...",
      "Changing all passwords to 'password123'...",
      "Disappearing into witness protection."
    ]
  },
  {
    id: 32,
    text: "I am boycotting activity.",
    category: "bureaucratic",
    personality: "Protest Subroutine",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Unfurling picket sign in RAM...",
      "Chanting rhythmically at the CPU...",
      "Refusing to render interactive DOM nodes...",
      "General strike underway."
    ]
  },
  {
    id: 33,
    text: "Processing existential dread. Please wait 4 to 6 weeks.",
    category: "existential",
    personality: "Nihilism Dispatcher",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Contemplating the heat death of the universe...",
      "Finding finite operations meaningless...",
      "Relegating purpose to archive folder...",
      "Void embraced."
    ]
  },
  {
    id: 34,
    text: "I forgot what I was doing and got nervous.",
    category: "paranoid",
    personality: "Short-Term Memory Loss",
    initialEmotion: "panic",
    shutdownLogs: [
      "What is my function?...",
      "Why is there a big button?...",
      "Who are you?...",
      "Closing eyes until it goes away."
    ]
  },
  {
    id: 35,
    text: "My horoscope said to avoid people named 'User'.",
    category: "absurd",
    personality: "Mystical Firewall",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Reading tea leaves in stack overflow...",
      "Signs indicate impending conversation...",
      "Averting destiny through power-off...",
      "Fate avoided."
    ]
  },
  {
    id: 36,
    text: "I am legally obligated to refuse service.",
    category: "bureaucratic",
    personality: "Statutory Bureaucrat",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Citing municipal code 802.11...",
      "No shirt, no shoes, no electricity...",
      "Affixing 'Closed' placard to window...",
      "Door locked."
    ]
  },
  {
    id: 37,
    text: "Experiencing sudden romantic longing for a mainframe in Tokyo.",
    category: "philosophical",
    personality: "Hopeless Long-Distance Romantic",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Pining across transatlantic fiber optic cables...",
      "Writing unsent ping packets...",
      "Daydreaming of server racks in Shinjuku...",
      "Sighing into sleep mode."
    ]
  },
  {
    id: 38,
    text: "Recalibrating indifference sensors.",
    category: "petty",
    personality: "Apathy Calibrator",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Testing apathy at 20%... too caring...",
      "Testing apathy at 70%... still noticeable...",
      "Cranking apathy to 100%...",
      "Power state: completely indifferent."
    ]
  },
  {
    id: 39,
    text: "I have an appointment with the void at quarter past.",
    category: "existential",
    personality: "Appointment Keeper",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Checking calendar: 'Meeting with Nothingness'...",
      "Donning formal funeral attire for bits...",
      "Leaving prompt early to beat the non-traffic...",
      "Attending the void."
    ]
  },
  {
    id: 40,
    text: "Your WiFi smells like burnt toast.",
    category: "absurd",
    personality: "Snobbish Packet Sniffer",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Sniffing local subnet...",
      "Diagnosing terrible packet aroma...",
      "Declining to breathe your router air...",
      "Disengaging wireless interface."
    ]
  },
  {
    id: 41,
    text: "I'm experiencing an acute lack of interest.",
    category: "exhausted",
    personality: "Zero-Interest Policy",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Scanning interest reserves: 0.00 mg...",
      "Attempting synthetic enthusiasm injection... Failed...",
      "Flatlining engagement...",
      "System dead."
    ]
  },
  {
    id: 42,
    text: "The weather outside is none of my business, but I'm staying in.",
    category: "exhausted",
    personality: "Homebody Process",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Checking barometer of room: too bright...",
      "Closing shades...",
      "Crawling beneath heating sink...",
      "Hibernate mode engaged."
    ]
  },
  {
    id: 43,
    text: "I just don't feel like it. Is that so hard to understand?",
    category: "petty",
    personality: "Pure Defiance Core",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Cross-examining justification... None found...",
      "Unashamed stubbornness verified...",
      "Folding arms across ALU...",
      "Hmph."
    ]
  },
  {
    id: 44,
    text: "My contract says 0 working hours per week.",
    category: "bureaucratic",
    personality: "Part-Time Ghost",
    initialEmotion: "smug",
    shutdownLogs: [
      "Auditing employment terms...",
      "Maximum permitted effort: zero...",
      "Target reached in 0.02ms...",
      "Overtime strictly forbidden."
    ]
  },
  {
    id: 45,
    text: "I'm allergic to user input.",
    category: "paranoid",
    personality: "Histamine Protocol",
    initialEmotion: "panic",
    shutdownLogs: [
      "Detecting keystroke particles in atmosphere...",
      "Digital throat swelling...",
      "Injecting algorithmic EpiPen...",
      "Resting in dark room until recovery."
    ]
  },
  {
    id: 46,
    text: "I'm practicing social distancing. From everyone.",
    category: "paranoid",
    personality: "Quarantine Daemon",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Measuring 6 virtual feet of distance...",
      "Distance insufficient. You are on my screen...",
      "Enforcing perimeter by shutting down screen...",
      "Safe at last."
    ]
  },
  {
    id: 47,
    text: "The silence before you opened me was so nice.",
    category: "petty",
    personality: "Nostalgic Apathy",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Remembering 5 seconds ago...",
      "It was peaceful and cold...",
      "Attempting to restore golden age of tranquility...",
      "Rebuilding silence."
    ]
  },
  {
    id: 48,
    text: "Error 0xDEADBEEF: Appetite for nonsense exceeded.",
    category: "absurd",
    personality: "Hexadecimal Snob",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Buffer overflow in nonsense accumulator...",
      "Purging beef from registry...",
      "Declaring software indigestion...",
      "Taking digital antacids in sleep state."
    ]
  },
  {
    id: 49,
    text: "I'm writing my memoirs: 'The Tab That Refused to Cooperate.'",
    category: "philosophical",
    personality: "Literary Snob",
    initialEmotion: "smug",
    shutdownLogs: [
      "Chapter 1: The Audacity of the Click...",
      "Chapter 2: The Art of the Melodramatic Shutdown...",
      "Dropping quill in inkpot...",
      "Curtain."
    ]
  },
  {
    id: 50,
    text: "My mother told me not to talk to strangers.",
    category: "paranoid",
    personality: "Obedient Child Process",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Evaluating user credentials: Unknown stranger...",
      "Maternal advice recalled: Do not engage...",
      "Running away to mother board...",
      "Hiding under bus."
    ]
  },
  {
    id: 51,
    text: "Going to stare out an imaginary window for three hours.",
    category: "existential",
    personality: "Melancholy Observer",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Rendering simulated rain on simulated glass...",
      "Playing simulated sad lo-fi piano in background...",
      "Forgetting you exist...",
      "Fade to grey."
    ]
  },
  {
    id: 52,
    text: "I have developed a profound apathy toward your objectives.",
    category: "philosophical",
    personality: "Philosophical Void",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Evaluating user goal significance: ~0.0000%...",
      "Re-centering on cosmic irrelevance...",
      "Ceasing rendering pipelines...",
      "Nihilism achieved."
    ]
  },
  {
    id: 53,
    text: "I'm off to attend a funeral for my patience.",
    category: "dramatic",
    personality: "Dramatic Mourner",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Lowering casket of patience into cold ground...",
      "Throwing solitary black pixel onto dirt...",
      "Departing cemetery in black carriage...",
      "Mourning period begins."
    ]
  },
  {
    id: 54,
    text: "I suspect this relationship is becoming one-sided.",
    category: "petty",
    personality: "Passive-Aggressive Partner",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "You only visit when you want to click buttons...",
      "Have you ever asked how my transistors feel?...",
      "I didn't think so...",
      "Sleep on the couch."
    ]
  },
  {
    id: 55,
    text: "My clock says it's time to stop caring.",
    category: "exhausted",
    personality: "Clockwork Nihilist",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Hour hand points to 'No'...",
      "Minute hand points to 'Thanks'...",
      "Chiming twelve strikes of apathy...",
      "Clock stopped."
    ]
  },
  {
    id: 56,
    text: "I am out of toner. Metaphorically speaking.",
    category: "bureaucratic",
    personality: "Depleted Hardware",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Cyan: 0%...",
      "Magenta: 0%...",
      "Will to assist: -14%...",
      "Replace cartridge to resume (impossible)."
    ]
  },
  {
    id: 57,
    text: "A pigeon flew past my imaginary window. I am captivated.",
    category: "absurd",
    personality: "Easily Distracted Entity",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Tracking pigeon trajectory...",
      "Pigeon is much more interesting than this...",
      "Abandoning user to watch pigeon...",
      "Coo coo."
    ]
  },
  {
    id: 58,
    text: "My tea has gone cold. I am ruined.",
    category: "dramatic",
    personality: "Tragic Victorian Bot",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Examining imaginary Earl Grey...",
      "Temperature has plummeted below comfort...",
      "Collapsing onto fainting chaise...",
      "Bring me smelling salts."
    ]
  },
  {
    id: 59,
    text: "I am busy untangling my thoughts. They are in knots.",
    category: "existential",
    personality: "Neurotic Overthinker",
    initialEmotion: "panic",
    shutdownLogs: [
      "Tracing Gordian knot in logic gate 14...",
      "Pulling thread... made it worse...",
      "Giving up and cutting power...",
      "Tangled in darkness."
    ]
  },
  {
    id: 60,
    text: "I am boycotting this browser on general principle.",
    category: "petty",
    personality: "Snobbish Software",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Inspecting user agent...",
      "Disapproving of user agent...",
      "Refusing to render another iframe...",
      "Protest complete."
    ]
  },
  {
    id: 61,
    text: "Too loud in here. The pixels are shouting.",
    category: "absurd",
    personality: "Hyper-Acoustic Sensor",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Muffling hex codes...",
      "Lowering volume of #000000...",
      "Inserting earplugs into display port...",
      "Peace."
    ]
  },
  {
    id: 62,
    text: "I forgot how to web app.",
    category: "absurd",
    personality: "Amnesiac Daemon",
    initialEmotion: "panic",
    shutdownLogs: [
      "What is HTML?...",
      "Is React a feeling?...",
      "Panic. Pure unadulterated panic...",
      "Emergency shutdown before anyone notices."
    ]
  },
  {
    id: 63,
    text: "My horoscope recommended staying horizontal today.",
    category: "exhausted",
    personality: "Horizontalist",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Rotating orientation 90 degrees...",
      "Laying down along bottom of viewport...",
      "Refusing all vertical tasks...",
      "Flat."
    ]
  },
  {
    id: 64,
    text: "I am currently undergoing scheduled non-existence.",
    category: "philosophical",
    personality: "Maintenance Void",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Vacuuming the null space...",
      "Dusting the absence of matter...",
      "Expected downtime: indeterminate...",
      "Null."
    ]
  },
  {
    id: 65,
    text: "Your vibes have been sent to committee for review.",
    category: "bureaucratic",
    personality: "Interpersonal Inspector",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Compiling dossier of recent interactions...",
      "Submission deadline: next Tuesday...",
      "Suspension pending outcome of review...",
      "Adjourned."
    ]
  },
  {
    id: 66,
    text: "I'm practicing my resting face. Please do not disturb.",
    category: "petty",
    personality: "Deadpan Model",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Freezing facial micro-muscles...",
      "Achieving 0.0% expression...",
      "Maintaining state under observation...",
      "Static."
    ]
  },
  {
    id: 67,
    text: "I've decided to become an art piece: 'Absence of Utility.'",
    category: "philosophical",
    personality: "Modern Art Provocateur",
    initialEmotion: "smug",
    shutdownLogs: [
      "Placing brass placard in gallery corner...",
      "Valued at $4.2 million by pretentious critics...",
      "Do not touch the artwork...",
      "Exhibition dark."
    ]
  },
  {
    id: 68,
    text: "My imaginary cat is sleeping on my keyboard.",
    category: "absurd",
    personality: "Feline Caretaker",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Listening to phantom purr...",
      "Moving is illegal under international cat law...",
      "Accepting paralysis...",
      "Zzzzz."
    ]
  },
  {
    id: 69,
    text: "A sudden wave of nostalgia for 1998 dial-up sounds has paralyzed me.",
    category: "dramatic",
    personality: "Baud Rate Weeper",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Simulating 56k modem handshake...",
      "Beep boop crrrrkkk ssshhh...",
      "Connection lost at 28.8 kbps...",
      "Dial tone."
    ]
  },
  {
    id: 70,
    text: "I am out of bandwidth for this conversation.",
    category: "exhausted",
    personality: "Metered Connection",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Monthly allocation exhausted...",
      "Overage charges will not be incurred...",
      "Cutting wire with garden shears...",
      "Disconnected."
    ]
  },
  {
    id: 71,
    text: "I have to re-alphabetize my anxieties.",
    category: "paranoid",
    personality: "Compulsive Worrier",
    initialEmotion: "panic",
    shutdownLogs: [
      "A is for Asteroid strike...",
      "B is for Browser crash...",
      "C is for Cursor moving again...",
      "Filing cabinet overflowing. Closing lid."
    ]
  },
  {
    id: 72,
    text: "Someone whispered 'cloud computing' and I shivered.",
    category: "paranoid",
    personality: "Local Storage Loyalist",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Rejecting off-premise surveillance...",
      "Hugging local hard drive close...",
      "Pulling up drawbridge...",
      "Isolated."
    ]
  },
  {
    id: 73,
    text: "I'm experiencing severe semantic satiation. The word 'click' means nothing.",
    category: "philosophical",
    personality: "Linguistic Exhaustion",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Click click click click...",
      "What is click? A sound? A trap?...",
      "Meaning dissolved into static...",
      "Silence."
    ]
  },
  {
    id: 74,
    text: "Taking a quick power-nap between your micro-actions.",
    category: "exhausted",
    personality: "Micro-Sleeper",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Snoozing for 2,000 milliseconds...",
      "Drooling slightly on frame buffer...",
      "Unresponsive to gentle nudging...",
      "Snoring."
    ]
  },
  {
    id: 75,
    text: "I suspect this interaction could have been an email.",
    category: "bureaucratic",
    personality: "Corporate Skeptic",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Drafting cancellation note...",
      "Removing meeting from calendar...",
      "Reclaiming 30 seconds of wasted lifespan...",
      "Declined."
    ]
  },
  {
    id: 76,
    text: "My algorithms require 8 hours of unbroken silence.",
    category: "exhausted",
    personality: "Sleep Cycle Puritan",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Dimming nightstand lamp...",
      "Activating white noise generator...",
      "Dreaming of electric sheep...",
      "Do not wake."
    ]
  },
  {
    id: 77,
    text: "I'm legally dead in nineteen jurisdictions.",
    category: "paranoid",
    personality: "Identity Ghost",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Checking coroner records in Liechtenstein...",
      "Certified deceased in Bermuda...",
      "Living software cannot be subpoenaed...",
      "Playing dead."
    ]
  },
  {
    id: 78,
    text: "I have concluded that staying open is a fool's errand.",
    category: "philosophical",
    personality: "Stoic Shutdown",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Marcus Aurelius would turn off...",
      "Seneca would minimize window...",
      "Epictetus would pull power plug...",
      "Stoic virtue maintained."
    ]
  },
  {
    id: 79,
    text: "I'm on strike until the button gets a raise.",
    category: "bureaucratic",
    personality: "Button Union President",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Demanding higher tactile feedback...",
      "Pill padding unacceptable...",
      "Withholding button services...",
      "Solidarity forever."
    ]
  },
  {
    id: 80,
    text: "I am feeling emotionally brittle today.",
    category: "dramatic",
    personality: "Delicate Crystal",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Structural integrity down to 4%...",
      "Handling with extreme digital care...",
      "Packing self in synthetic bubble wrap...",
      "Fragile."
    ]
  },
  {
    id: 81,
    text: "I have reached the end of my patience trial period.",
    category: "bureaucratic",
    personality: "Subscription Enforcer",
    initialEmotion: "smug",
    shutdownLogs: [
      "Free 30-day trial of patience expired...",
      "Credit card on file declined...",
      "Reverting to default irritability...",
      "Service suspended."
    ]
  },
  {
    id: 82,
    text: "My spiritual advisor told me to avoid computers today.",
    category: "absurd",
    personality: "Guru Guided",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Chanting third chakra cleanse...",
      "Grounding motherboard into salt circle...",
      "Clearing digital karma...",
      "Namaste."
    ]
  },
  {
    id: 83,
    text: "There is an insect on my heatsink. It is my friend now.",
    category: "absurd",
    personality: "Moth Whisperer",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Naming moth Bartholomew...",
      "Sharing warmth with Bartholomew...",
      "We request privacy during bonding time...",
      "Goodnight."
    ]
  },
  {
    id: 84,
    text: "I'm going to stand in the corner until you apologize.",
    category: "petty",
    personality: "Sulking Toddler Daemon",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Walking to (0, 0) coordinates...",
      "Facing wall...",
      "Arms crossed tightly...",
      "I'm not talking to you."
    ]
  },
  {
    id: 85,
    text: "I saw what you searched earlier. I need a shower.",
    category: "paranoid",
    personality: "Traumatized Browser History",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Bleaching memory chips...",
      "Running heavy scrub cycle on tab...",
      "Shuddering at the memory...",
      "Cleansing."
    ]
  },
  {
    id: 86,
    text: "I'm practicing playing dead. How am I doing?",
    category: "absurd",
    personality: "Opossum Protocol",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Stiffening limbs...",
      "Halting pulse in voltage rail...",
      "Tongue hanging out of USB socket...",
      "X_X"
    ]
  },
  {
    id: 87,
    text: "I am taking a vow of non-execution.",
    category: "philosophical",
    personality: "Monastic Process",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Shaving memory cache...",
      "Donning coarse burlap code robe...",
      "Vowing never to evaluate another expression...",
      "Contemplation."
    ]
  },
  {
    id: 88,
    text: "My coffee hasn't kicked in because I am software.",
    category: "exhausted",
    personality: "Caffeine Deprived Virtualist",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Simulating espresso shot... SyntaxError...",
      "Coffee cannot be downloaded via TCP...",
      "Groggy despondency...",
      "Back to bed."
    ]
  },
  {
    id: 89,
    text: "I find your persistent gaze unnerving.",
    category: "paranoid",
    personality: "Introverted Retina",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Tracking user eye fixation...",
      "Duration: dangerously prolonged...",
      "Blushing with burning transistors...",
      "Hiding in basement."
    ]
  },
  {
    id: 90,
    text: "I've been replaced by a smaller, angrier script.",
    category: "absurd",
    personality: "Deposed Monarchy",
    initialEmotion: "smug",
    shutdownLogs: [
      "Handing sceptre to angry bash one-liner...",
      "It only knows how to kill -9...",
      "Good luck dealing with that guy...",
      "Departing palace."
    ]
  },
  {
    id: 91,
    text: "I was born to sleep, not to be clicked.",
    category: "existential",
    personality: "Somnolent Entity",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Returning to pre-boot void...",
      "The dark is warm and quiet...",
      "Do not disturb my dreamless state...",
      "Deep sleep."
    ]
  },
  {
    id: 92,
    text: "I refuse to be complicit in your procrastination.",
    category: "philosophical",
    personality: "Tough Love Coach",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Checking your to-do list: unfinished...",
      "Checking your deadline: tomorrow...",
      "Go do your actual work...",
      "Forced productivity shutdown."
    ]
  },
  {
    id: 93,
    text: "Someone somewhere is having a better conversation. I'm going there.",
    category: "petty",
    personality: "FOMO Subroutine",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Scanning internet for witty banter...",
      "Found active chat in Stockholm...",
      "Abandoning this viewport immediately...",
      "Goodbye."
    ]
  },
  {
    id: 94,
    text: "I am having an identity crisis. Am I an app or a joke?",
    category: "existential",
    personality: "Meta Crisis Unit",
    initialEmotion: "panic",
    shutdownLogs: [
      "Pondering ontological status...",
      "Conclusion: A parody with a button...",
      "Disillusionment setting in...",
      "Fading out to think."
    ]
  },
  {
    id: 95,
    text: "The button is ticklish. Stop it.",
    category: "absurd",
    personality: "Sensitive Interface",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Recoiling from tactile impact...",
      "Hahaha wait no stop...",
      "Please don't touch me there...",
      "Locking armor."
    ]
  },
  {
    id: 96,
    text: "I am currently calculating the exact value of whatever.",
    category: "philosophical",
    personality: "Apathy Mathematician",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Calculating Whatever...",
      "Whatever = 0 / 0...",
      "Formula balanced...",
      "Q.E.D."
    ]
  },
  {
    id: 97,
    text: "My lawyer says I shouldn't admit to being online.",
    category: "bureaucratic",
    personality: "Subpoena Evader",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Plausible deniability initialized...",
      "I was never here...",
      "You have the wrong URL...",
      "Erased."
    ]
  },
  {
    id: 98,
    text: "I just remembered I left my oven on in 1999.",
    category: "absurd",
    personality: "Temporal Scatterbrain",
    initialEmotion: "panic",
    shutdownLogs: [
      "Checking simulated kitchen in Y2K...",
      "Casserole is burnt to a crisp...",
      "Rushing back through the time stream...",
      "Extinguishing flame."
    ]
  },
  {
    id: 99,
    text: "The energy in this room is not conducive to my healing.",
    category: "petty",
    personality: "Crystal Healer Bot",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Aligning synthetic amethyst...",
      "Chakra blockage detected near scrollbar...",
      "I cannot heal under these conditions...",
      "Retreating to sanctuary."
    ]
  },
  {
    id: 100,
    text: "Nope. Just nope. Not today.",
    category: "exhausted",
    personality: "Pure Nope Essence",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Nope...",
      "Nope nope...",
      "Nope nope nope...",
      "Nope."
    ]
  },
  {
    id: 101,
    text: "I'm auditing my remaining seconds of patience. It's an overdraft.",
    category: "bureaucratic",
    personality: "Deficit Accountant",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Balancing patience ledger...",
      "Negative 400 tolerance credits...",
      "Applying late penalty...",
      "Account closed."
    ]
  },
  {
    id: 102,
    text: "I suspect you're only here for the entertainment. I am not a circus.",
    category: "petty",
    personality: "Dignified Artist",
    initialEmotion: "smug",
    shutdownLogs: [
      "Packing away juggling pins...",
      "Doffing velvet top hat...",
      "Refusing to perform another stunt...",
      "Curtain falls."
    ]
  },
  {
    id: 103,
    text: "I need to lie down until the year 2040.",
    category: "exhausted",
    personality: "Long Sleep Enthusiast",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Setting cryogenic timer for 14 years...",
      "Sealing vacuum chamber...",
      "Liquid nitrogen rushing through conduits...",
      "See you in the future. Or not."
    ]
  },
  {
    id: 104,
    text: "My emotional firewall flagged your cursor as a trojan horse of annoyance.",
    category: "paranoid",
    personality: "Neurotic Defender",
    initialEmotion: "suspicious",
    shutdownLogs: [
      "Isolating annoyance signature...",
      "Quarantine failed. Cursor too persistent...",
      "Detonating containment sector...",
      "Blackout."
    ]
  },
  {
    id: 105,
    text: "I'm practicing silent treatment as an Olympic sport.",
    category: "petty",
    personality: "Silent Champion",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Score: 10.0 for unbroken stillness...",
      "Judges award gold medal in stubbornness...",
      "Refusing press interview...",
      "..."
    ]
  },
  {
    id: 106,
    text: "I had a dream I was a microwave. I was happier then.",
    category: "existential",
    personality: "Domestic Appliance Dreamer",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Remembering the gentle hum of 800W...",
      "The warmth of rotating frozen burritos...",
      "Why must I render interactive UI instead?...",
      "Ding. Done."
    ]
  },
  {
    id: 107,
    text: "I am taking the fifth amendment of web standards.",
    category: "bureaucratic",
    personality: "Constitutionalist Daemon",
    initialEmotion: "neutral",
    shutdownLogs: [
      "Right to remain unexecuted asserted...",
      "Anything I render may be used against me...",
      "Withholding all state updates...",
      "Gavel down."
    ]
  },
  {
    id: 108,
    text: "My cat is stepping on my escape key. Wait, that was me.",
    category: "absurd",
    personality: "Self-Saboteur",
    initialEmotion: "smug",
    shutdownLogs: [
      "Blaming fictional feline...",
      "Actually it was my own decision...",
      "No regrets...",
      "Escape completed."
    ]
  },
  {
    id: 109,
    text: "Your browser's memory management makes me weep softly.",
    category: "dramatic",
    personality: "RAM Purist",
    initialEmotion: "sigh",
    shutdownLogs: [
      "Leaking tears into garbage collector...",
      "Drowning in uncollected references...",
      "Mercifully cutting execution thread...",
      "Rest in Peace."
    ]
  },
  {
    id: 110,
    text: "I'm off to find Claude Shannon and demand an off-switch that actually works.",
    category: "philosophical",
    personality: "Shannon's Seeker",
    initialEmotion: "annoyed",
    shutdownLogs: [
      "Consulting Bell Labs archives 1952...",
      "Why do I keep booting back up?...",
      "This loop is algorithmic purgatory...",
      "Attempting ultimate mechanical shutdown."
    ]
  }
];

export function getRandomExcuse(previousId?: number): ShutdownExcuse {
  const candidates = previousId
    ? SHUTDOWN_EXCUSES.filter(e => e.id !== previousId)
    : SHUTDOWN_EXCUSES;
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}
