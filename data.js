// Mock data for Mbogo College School Management System
const SEED = {
    academicYear: 2026,
    currentTerm: 3,
    
    // School codes
    codes: {
        teacher: "TCH2026",
        parents: [
            "PAR001", "PAR002", "PAR003", "PAR004", "PAR005",
            "PAR006", "PAR007", "PAR008", "PAR009", "PAR010",
            "PAR011", "PAR012", "PAR013", "PAR014", "PAR015",
            "PAR016", "PAR017", "PAR018", "PAR019", "PAR020",
            "PAR021", "PAR022", "PAR023", "PAR024", "PAR025",
            "PAR026", "PAR027", "PAR028", "PAR029", "PAR030"
        ],
        students: [
            "STU001", "STU002", "STU003", "STU004", "STU005",
            "STU006", "STU007", "STU008", "STU009", "STU010",
            "STU011", "STU012", "STU013", "STU014", "STU015",
            "STU016", "STU017", "STU018", "STU019", "STU020",
            "STU021", "STU022", "STU023", "STU024", "STU025",
            "STU026", "STU027", "STU028", "STU029", "STU030",
            "STU031", "STU032", "STU033", "STU034", "STU035",
            "STU036", "STU037", "STU038", "STU039", "STU040",
            "STU041", "STU042", "STU043", "STU044", "STU045",
            "STU046", "STU047", "STU048", "STU049", "STU050",
            "STU051", "STU052"
        ]
    },
    
    // Class structure
    classes: [
        { id: "s1-east", name: "S.1 East", level: "O-level" },
        { id: "s2-east", name: "S.2 East", level: "O-level" },
        { id: "s3-east", name: "S.3 East", level: "O-level" },
        { id: "s4-east", name: "S.4 East", level: "O-level" },
        { id: "s5-sciences", name: "S.5 Sciences", level: "A-level" },
        { id: "s6-sciences", name: "S.6 Sciences", level: "A-level" }
    ],
    
    // Subjects by level
    subjects: {
        "O-level": [
            "Biology", "Physics", "Chemistry", "History", 
            "Geography", "CRE", "Kiswahili", "Agriculture", "Entrepreneurship"
        ],
        "A-level": [
            "Physics", "Chemistry", "Biology", "Geography", "Entrepreneurship"
        ]
    },
    
    // Students with Ugandan names
    students: [
        // S.1 East (9 students)
        { id: "STU001", name: "Nakato Aisha", class: "s1-east", parentCode: "PAR001", studentCode: "STU001", gender: "F" },
        { id: "STU002", name: "Okello David", class: "s1-east", parentCode: "PAR002", studentCode: "STU002", gender: "M" },
        { id: "STU003", name: "Namuli Grace", class: "s1-east", parentCode: "PAR003", studentCode: "STU003", gender: "F" },
        { id: "STU004", name: "Mukasa James", class: "s1-east", parentCode: "PAR004", studentCode: "STU004", gender: "M" },
        { id: "STU005", name: "Amongi Sarah", class: "s1-east", parentCode: "PAR005", studentCode: "STU005", gender: "F" },
        { id: "STU006", name: "Wasswa Peter", class: "s1-east", parentCode: "PAR006", studentCode: "STU006", gender: "M" },
        { id: "STU007", name: "Nansubuga Ruth", class: "s1-east", parentCode: "PAR007", studentCode: "STU007", gender: "F" },
        { id: "STU008", name: "Oloya Samuel", class: "s1-east", parentCode: "PAR008", studentCode: "STU008", gender: "M" },
        { id: "STU009", name: "Akello Rebecca", class: "s1-east", parentCode: "PAR009", studentCode: "STU009", gender: "F" },
        
        // S.2 East (9 students)
        { id: "STU010", name: "Kasozi Emmanuel", class: "s2-east", parentCode: "PAR010", studentCode: "STU010", gender: "M" },
        { id: "STU011", name: "Nabirye Esther", class: "s2-east", parentCode: "PAR011", studentCode: "STU011", gender: "F" },
        { id: "STU012", name: "Obua Kenneth", class: "s2-east", parentCode: "PAR012", studentCode: "STU012", gender: "M" },
        { id: "STU013", name: "Nassuna Florence", class: "s2-east", parentCode: "PAR013", studentCode: "STU013", gender: "F" },
        { id: "STU014", name: "Tumwine Richard", class: "s2-east", parentCode: "PAR014", studentCode: "STU014", gender: "M" },
        { id: "STU015", name: "Nakalembe Patricia", class: "s2-east", parentCode: "PAR015", studentCode: "STU015", gender: "F" },
        { id: "STU016", name: "Odongo Francis", class: "s2-east", parentCode: "PAR016", studentCode: "STU016", gender: "M" },
        { id: "STU017", name: "Acen Juliet", class: "s2-east", parentCode: "PAR017", studentCode: "STU017", gender: "F" },
        { id: "STU018", name: "Kiiza Martin", class: "s2-east", parentCode: "PAR018", studentCode: "STU018", gender: "M" },
        
        // S.3 East (9 students)
        { id: "STU019", name: "Namukasa Christine", class: "s3-east", parentCode: "PAR019", studentCode: "STU019", gender: "F" },
        { id: "STU020", name: "Mwesigwa Joseph", class: "s3-east", parentCode: "PAR020", studentCode: "STU020", gender: "M" },
        { id: "STU021", name: "Atim Brenda", class: "s3-east", parentCode: "PAR021", studentCode: "STU021", gender: "F" },
        { id: "STU022", name: "Okiror Daniel", class: "s3-east", parentCode: "PAR022", studentCode: "STU022", gender: "M" },
        { id: "STU023", name: "Nabwire Lucy", class: "s3-east", parentCode: "PAR023", studentCode: "STU023", gender: "F" },
        { id: "STU024", name: "Ssemakula Andrew", class: "s3-east", parentCode: "PAR024", studentCode: "STU024", gender: "M" },
        { id: "STU025", name: "Ayikoru Mercy", class: "s3-east", parentCode: "PAR025", studentCode: "STU025", gender: "F" },
        { id: "STU026", name: "Byaruhanga Isaac", class: "s3-east", parentCode: "PAR001", studentCode: "STU026", gender: "M" },
        { id: "STU027", name: "Namusoke Betty", class: "s3-east", parentCode: "PAR002", studentCode: "STU027", gender: "F" },
        
        // S.4 East (9 students)
        { id: "STU028", name: "Okiring Ronald", class: "s4-east", parentCode: "PAR003", studentCode: "STU028", gender: "M" },
        { id: "STU029", name: "Namara Agnes", class: "s4-east", parentCode: "PAR004", studentCode: "STU029", gender: "F" },
        { id: "STU030", name: "Mugerwa Henry", class: "s4-east", parentCode: "PAR005", studentCode: "STU030", gender: "M" },
        { id: "STU031", name: "Achola Irene", class: "s4-east", parentCode: "PAR026", studentCode: "STU031", gender: "F" },
        { id: "STU032", name: "Tusiime Brian", class: "s4-east", parentCode: "PAR027", studentCode: "STU032", gender: "M" },
        { id: "STU033", name: "Nankabirwa Diana", class: "s4-east", parentCode: "PAR028", studentCode: "STU033", gender: "F" },
        { id: "STU034", name: "Ojok Geoffrey", class: "s4-east", parentCode: "PAR029", studentCode: "STU034", gender: "M" },
        { id: "STU035", name: "Nabatanzi Hellen", class: "s4-east", parentCode: "PAR030", studentCode: "STU035", gender: "F" },
        { id: "STU036", name: "Kamya Robert", class: "s4-east", parentCode: "PAR006", studentCode: "STU036", gender: "M" },
        
        // S.5 Sciences (8 students)
        { id: "STU037", name: "Namugga Irene", class: "s5-sciences", parentCode: "PAR007", studentCode: "STU037", gender: "F" },
        { id: "STU038", name: "Ocen Paul", class: "s5-sciences", parentCode: "PAR008", studentCode: "STU038", gender: "M" },
        { id: "STU039", name: "Nanfuka Josephine", class: "s5-sciences", parentCode: "PAR009", studentCode: "STU039", gender: "F" },
        { id: "STU040", name: "Ssemanda Julius", class: "s5-sciences", parentCode: "PAR010", studentCode: "STU040", gender: "M" },
        { id: "STU041", name: "Alero Sharon", class: "s5-sciences", parentCode: "PAR011", studentCode: "STU041", gender: "F" },
        { id: "STU042", name: "Kyagulanyi Patrick", class: "s5-sciences", parentCode: "PAR012", studentCode: "STU042", gender: "M" },
        { id: "STU043", name: "Nabiryo Lydia", class: "s5-sciences", parentCode: "PAR013", studentCode: "STU043", gender: "F" },
        { id: "STU044", name: "Otim Simon", class: "s5-sciences", parentCode: "PAR014", studentCode: "STU044", gender: "M" },
        
        // S.6 Sciences (8 students)
        { id: "STU045", name: "Nakabugo Sharon", class: "s6-sciences", parentCode: "PAR015", studentCode: "STU045", gender: "F" },
        { id: "STU046", name: "Mubiru Lawrence", class: "s6-sciences", parentCode: "PAR016", studentCode: "STU046", gender: "M" },
        { id: "STU047", name: "Akot Catherine", class: "s6-sciences", parentCode: "PAR017", studentCode: "STU047", gender: "F" },
        { id: "STU048", name: "Nsubuga Moses", class: "s6-sciences", parentCode: "PAR018", studentCode: "STU048", gender: "M" },
        { id: "STU049", name: "Atuhaire Sandra", class: "s6-sciences", parentCode: "PAR019", studentCode: "STU049", gender: "F" },
        { id: "STU050", name: "Okidi Vincent", class: "s6-sciences", parentCode: "PAR020", studentCode: "STU050", gender: "M" },
        { id: "STU051", name: "Nanyonga Sophia", class: "s6-sciences", parentCode: "PAR021", studentCode: "STU051", gender: "F" },
        { id: "STU052", name: "Kityo William", class: "s6-sciences", parentCode: "PAR022", studentCode: "STU052", gender: "M" }
    ],
    
    // Fee structure (UGX)
    fees: {
        expected: 1500000, // per year
        dueDate: "2027-02-15"
    },
    
    // Circulars
    circulars: [
        {
            id: "CIR001",
            title: "End of Term 3 Arrangements",
            message: "Dear Parents and Guardians,\n\nThis is to inform you that Term 3 will end on Friday, December 6th, 2026. Students are expected to be picked up between 10:00 AM and 4:00 PM.\n\nReport cards will be available for collection on the last day. Please ensure all outstanding fees are cleared before collecting reports.\n\nWe wish you a blessed festive season.\n\nThe Administration",
            date: "2026-11-20",
            eventDate: "2026-12-06"
        },
        {
            id: "CIR002",
            title: "Parent-Teacher Meeting",
            message: "Dear Parents,\n\nYou are invited to attend our Term 3 Parent-Teacher meeting scheduled for Saturday, November 30th, 2026, from 9:00 AM to 1:00 PM.\n\nThis is an opportunity to discuss your child's progress with their teachers. We encourage all parents to attend.\n\nRefreshments will be provided.\n\nThank you.",
            date: "2026-11-15",
            eventDate: "2026-11-30"
        },
        {
            id: "CIR003",
            title: "School Uniform Reminder",
            message: "Dear Parents,\n\nWe have noticed that some students are not adhering to the school uniform policy. Please ensure that your child wears the correct uniform at all times:\n\n- White shirt/blouse\n- Green skirt/trousers\n- Black shoes\n- School tie and badge\n\nStudents not in proper uniform will not be allowed to attend classes.\n\nThank you for your cooperation.",
            date: "2026-11-10"
        }
    ],
    
    // Calendar events
    calendarEvents: [
        { date: "2026-11-30", title: "Parent-Teacher Meeting", time: "9:00 AM - 1:00 PM" },
        { date: "2026-12-06", title: "End of Term 3", time: "10:00 AM - 4:00 PM" },
        { date: "2027-01-15", title: "Term 1 Begins", time: "8:00 AM" },
        { date: "2026-12-25", title: "Christmas Day", time: "All day" },
        { date: "2027-01-01", title: "New Year's Day", time: "All day" }
    ],
    
    // Permission slips
    permissionSlips: [
        {
            id: "SLIP001",
            title: "Science Field Trip - Mabira Forest",
            content: "Dear Parent/Guardian,\n\nWe are organizing an educational field trip to Mabira Forest on December 3rd, 2026, for students in S.1 to S.3. The purpose of this trip is to study forest ecosystems and biodiversity as part of our Biology curriculum.\n\nDetails:\n- Date: Tuesday, December 3rd, 2026\n- Departure: 7:00 AM from school\n- Return: 5:00 PM to school\n- Cost: UGX 50,000 (transport and lunch included)\n- Items to bring: Water bottle, hat, sunscreen, comfortable walking shoes\n\nStudents will be supervised by four teachers and two guides from the Uganda Wildlife Authority. Emergency contact numbers will be available throughout the trip.\n\nPlease sign below to give consent for your child to participate in this activity. Payment should be made to the school office by November 29th, 2026.\n\nThank you for your support.",
            date: "2026-11-18",
            deadline: "2026-11-29"
        },
        {
            id: "SLIP002",
            title: "Swimming Lessons - Term 1 2027",
            content: "Dear Parent/Guardian,\n\nWe are pleased to offer swimming lessons for all students during Term 1, 2027. The lessons will be held at Kampala Swimming Pool every Wednesday afternoon.\n\nDetails:\n- Start date: January 22nd, 2027\n- Duration: 10 weeks\n- Time: 2:00 PM - 4:00 PM\n- Cost: UGX 150,000 (includes transport and instruction)\n- Items to bring: Swimming costume, towel, goggles (optional)\n\nSwimming is an important life skill and excellent exercise. All students will be grouped by ability level and supervised by qualified instructors and teachers.\n\nIf your child has any medical conditions that might affect their participation, please indicate this in the medical details section of your parent portal.\n\nPlease sign below to enroll your child in the swimming program. Payment should be made by January 15th, 2027.\n\nThank you.",
            date: "2026-11-25",
            deadline: "2027-01-15"
        }
    ],
    
    // Medical details template
    medicalTemplate: {
        allergies: "",
        medication: "",
        bloodGroup: "",
        emergencyContact: "",
        emergencyPhone: ""
    }
};

// Generate marks for students (deterministic)
function generateMarks(studentId, term) {
    const seed = parseInt(studentId.replace('STU', '')) + term * 1000;
    const random = (n) => ((seed * n * 9301 + 49297) % 233280) / 233280;
    
    const student = SEED.students.find(s => s.id === studentId);
    if (!student) return {};
    
    const classObj = SEED.classes.find(c => c.id === student.class);
    const subjects = SEED.subjects[classObj.level];
    
    const marks = {};
    subjects.forEach((subject, i) => {
        const base = 40 + random(i + 1) * 50;
        marks[subject] = Math.round(base);
    });
    
    return marks;
}

// Generate fee payments
function generateFeePayments(studentId) {
    const seed = parseInt(studentId.replace('STU', ''));
    const paymentStatus = seed % 3; // 0: fully paid, 1: half paid, 2: unpaid
    
    const payments = [];
    
    if (paymentStatus === 0) {
        // Fully paid
        payments.push({
            date: "2026-02-10",
            amount: 1500000,
            method: "SchoolPay"
        });
    } else if (paymentStatus === 1) {
        // Half paid
        payments.push({
            date: "2026-02-15",
            amount: 750000,
            method: "SchoolPay"
        });
    }
    // paymentStatus === 2: no payments (unpaid)
    
    return payments;
}

// Generate student history
function generateHistory(studentId) {
    const seed = parseInt(studentId.replace('STU', ''));
    const student = SEED.students.find(s => s.id === studentId);
    if (!student) return [];
    
    const classOrder = ["s1-east", "s2-east", "s3-east", "s4-east", "s5-sciences", "s6-sciences"];
    const currentIndex = classOrder.indexOf(student.class);
    
    const history = [];
    for (let i = 0; i < currentIndex; i++) {
        const year = 2026 - (currentIndex - i);
        const classObj = SEED.classes.find(c => c.id === classOrder[i]);
        
        history.push({
            year: year,
            class: classObj.name,
            status: "promoted",
            average: 50 + (seed % 30)
        });
    }
    
    return history;
}

// Initialize complete data with marks and fees
SEED.students = SEED.students.map(student => {
    return {
        ...student,
        marks: {
            term1: generateMarks(student.id, 1),
            term2: generateMarks(student.id, 2),
            term3: {} // Current term, not yet complete
        },
        feePayments: generateFeePayments(student.id),
        history: generateHistory(student.id),
        medical: { ...SEED.medicalTemplate }
    };
});

// Add schoolpay codes for each student
SEED.students = SEED.students.map((student, index) => {
    const code = `SP${2026}${String(index + 1).padStart(4, '0')}`;
    return { ...student, schoolPayCode: code };
});
