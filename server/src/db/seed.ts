import pool from '../config/database';

const collegeImages: Record<string, string> = {
  'Indian Institute of Technology Bombay': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Indian Institute of Technology Delhi': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Indian Institute of Technology Madras': 'https://images.unsplash.com/photo-1581078426770-67b56b55aa22?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Indian Institute of Technology Kanpur': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Indian Institute of Technology Kharagpur': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Birla Institute of Technology and Science Pilani': 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'National Institute of Technology Trichy': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Vellore Institute of Technology': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Delhi University': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Manipal Institute of Technology': 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Indian Institute of Science Bangalore': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'SRM Institute of Science and Technology': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Jadavpur University': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Amity University Noida': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'National Institute of Technology Warangal': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Christ University Bangalore': 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Thapar Institute of Engineering': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'PSG College of Technology': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Symbiosis International University': 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'College of Engineering Pune': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Anna University': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Lovely Professional University': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'IIIT Hyderabad': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'PES University': 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'RV College of Engineering': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'National Institute of Technology Surathkal': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'National Institute of Technology Calicut': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Indian Institute of Technology Roorkee': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Indian Institute of Technology Guwahati': 'https://images.unsplash.com/photo-1581078426770-67b56b55aa22?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'National Institute of Technology Rourkela': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Birla Institute of Technology Mesra': 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Shiv Nadar University': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Ashoka University': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'University of Hyderabad': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Banaras Hindu University': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Aligarh Muslim University': 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Jamia Millia Islamia': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Sastra Deemed University': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'VIT-AP University': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'DY Patil International University': 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Kalinga Institute of Industrial Technology': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=450&fit=crop&crop=entropy&auto=format',
  'Manipal University Jaipur': 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format',
};

const getCollegeImage = (collegeName: string): string => {
  if (collegeImages[collegeName]) {
    return collegeImages[collegeName];
  }
  // Fallback to themed images based on college type
  const slug = collegeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (collegeName.toLowerCase().includes('institute of technology') || collegeName.toLowerCase().includes('iit')) {
    return `https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&crop=entropy&auto=format&query=${slug}`;
  }
  if (collegeName.toLowerCase().includes('university')) {
    return `https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&crop=entropy&auto=format&query=${slug}`;
  }
  return `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&crop=entropy&auto=format&query=${slug}`;
};

const colleges = [
  { name: 'Indian Institute of Technology Bombay', location: 'Powai, Mumbai', city: 'Mumbai', state: 'Maharashtra', type: 'Public', established: 1958, rating: 4.8, fees_min: 200000, fees_max: 250000, description: 'Premier engineering institute known for cutting-edge research and world-class faculty.', campus_size: '550 acres', website: 'https://www.iitb.ac.in', placement_rate: 95.0, avg_package: 2100000, highest_package: 30000000 },
  { name: 'Indian Institute of Technology Delhi', location: 'Hauz Khas, New Delhi', city: 'New Delhi', state: 'Delhi', type: 'Public', established: 1961, rating: 4.7, fees_min: 200000, fees_max: 250000, description: 'One of India\'s top engineering institutions with strong industry connections.', campus_size: '325 acres', website: 'https://www.iitd.ac.in', placement_rate: 93.0, avg_package: 2000000, highest_package: 28000000 },
  { name: 'Indian Institute of Technology Madras', location: 'Adyar, Chennai', city: 'Chennai', state: 'Tamil Nadu', type: 'Public', established: 1959, rating: 4.8, fees_min: 200000, fees_max: 250000, description: 'Top-ranked IIT known for research excellence and beautiful campus inside a forest reserve.', campus_size: '617 acres', website: 'https://www.iitm.ac.in', placement_rate: 96.0, avg_package: 2150000, highest_package: 31000000 },
  { name: 'Indian Institute of Technology Kanpur', location: 'Kalyanpur, Kanpur', city: 'Kanpur', state: 'Uttar Pradesh', type: 'Public', established: 1959, rating: 4.6, fees_min: 200000, fees_max: 250000, description: 'Pioneer in computer science education in India with a strong entrepreneurial culture.', campus_size: '1055 acres', website: 'https://www.iitk.ac.in', placement_rate: 90.0, avg_package: 1900000, highest_package: 25000000 },
  { name: 'Indian Institute of Technology Kharagpur', location: 'Kharagpur', city: 'Kharagpur', state: 'West Bengal', type: 'Public', established: 1951, rating: 4.5, fees_min: 200000, fees_max: 250000, description: 'The first IIT established in India, offering the widest range of courses among all IITs.', campus_size: '2100 acres', website: 'https://www.iitkgp.ac.in', placement_rate: 89.0, avg_package: 1800000, highest_package: 24000000 },
  { name: 'Birla Institute of Technology and Science Pilani', location: 'Vidya Vihar, Pilani', city: 'Pilani', state: 'Rajasthan', type: 'Private', established: 1964, rating: 4.5, fees_min: 400000, fees_max: 550000, description: 'Premier private university known for flexible academic structure and strong alumni network.', campus_size: '328 acres', website: 'https://www.bits-pilani.ac.in', placement_rate: 88.0, avg_package: 1600000, highest_package: 20000000 },
  { name: 'National Institute of Technology Trichy', location: 'Tiruchirappalli', city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Public', established: 1964, rating: 4.3, fees_min: 150000, fees_max: 200000, description: 'One of the top NITs in India with excellent placement records.', campus_size: '800 acres', website: 'https://www.nitt.edu', placement_rate: 85.0, avg_package: 1200000, highest_package: 18000000 },
  { name: 'Vellore Institute of Technology', location: 'Katpadi, Vellore', city: 'Vellore', state: 'Tamil Nadu', type: 'Private', established: 1984, rating: 4.2, fees_min: 300000, fees_max: 500000, description: 'Leading private university known for its vibrant campus life and global collaborations.', campus_size: '372 acres', website: 'https://www.vit.ac.in', placement_rate: 82.0, avg_package: 900000, highest_package: 14000000 },
  { name: 'Delhi University', location: 'North Campus, Delhi', city: 'New Delhi', state: 'Delhi', type: 'Public', established: 1922, rating: 4.3, fees_min: 50000, fees_max: 150000, description: 'India\'s premier central university with a rich heritage and diverse academic programs.', campus_size: '680 acres', website: 'https://www.du.ac.in', placement_rate: 75.0, avg_package: 800000, highest_package: 12000000 },
  { name: 'Manipal Institute of Technology', location: 'Manipal', city: 'Manipal', state: 'Karnataka', type: 'Private', established: 1957, rating: 4.1, fees_min: 350000, fees_max: 500000, description: 'One of India\'s oldest and most reputed private engineering colleges.', campus_size: '600 acres', website: 'https://www.manipal.edu', placement_rate: 80.0, avg_package: 850000, highest_package: 12000000 },
  { name: 'Indian Institute of Science Bangalore', location: 'Malleswaram, Bangalore', city: 'Bangalore', state: 'Karnataka', type: 'Public', established: 1909, rating: 4.9, fees_min: 100000, fees_max: 200000, description: 'India\'s premier research institution, consistently ranked #1 for research output.', campus_size: '400 acres', website: 'https://www.iisc.ac.in', placement_rate: 92.0, avg_package: 2200000, highest_package: 32000000 },
  { name: 'SRM Institute of Science and Technology', location: 'Kattankulathur, Chennai', city: 'Chennai', state: 'Tamil Nadu', type: 'Private', established: 1985, rating: 3.9, fees_min: 250000, fees_max: 450000, description: 'One of India\'s top-ranked private universities with a global outlook.', campus_size: '250 acres', website: 'https://www.srmist.edu.in', placement_rate: 78.0, avg_package: 700000, highest_package: 10000000 },
  { name: 'Jadavpur University', location: 'Jadavpur, Kolkata', city: 'Kolkata', state: 'West Bengal', type: 'Public', established: 1955, rating: 4.3, fees_min: 30000, fees_max: 80000, description: 'Prestigious state university known for engineering and research excellence.', campus_size: '57 acres', website: 'https://www.jaduniv.edu.in', placement_rate: 82.0, avg_package: 1000000, highest_package: 16000000 },
  { name: 'Amity University Noida', location: 'Sector 125, Noida', city: 'Noida', state: 'Uttar Pradesh', type: 'Private', established: 2005, rating: 3.7, fees_min: 300000, fees_max: 600000, description: 'Largest private university with modern infrastructure and international tie-ups.', campus_size: '1000 acres', website: 'https://www.amity.edu', placement_rate: 70.0, avg_package: 600000, highest_package: 8000000 },
  { name: 'National Institute of Technology Warangal', location: 'Warangal', city: 'Warangal', state: 'Telangana', type: 'Public', established: 1959, rating: 4.2, fees_min: 140000, fees_max: 190000, description: 'One of the first NITs established in India with strong engineering programs.', campus_size: '248 acres', website: 'https://www.nitw.ac.in', placement_rate: 84.0, avg_package: 1100000, highest_package: 15000000 },
  { name: 'Christ University Bangalore', location: 'Hosur Road, Bangalore', city: 'Bangalore', state: 'Karnataka', type: 'Private', established: 1969, rating: 4.0, fees_min: 200000, fees_max: 400000, description: 'Premier private university known for discipline, academics, and holistic development.', campus_size: '45 acres', website: 'https://www.christuniversity.in', placement_rate: 76.0, avg_package: 700000, highest_package: 9000000 },
  { name: 'Thapar Institute of Engineering', location: 'Bhadson Road, Patiala', city: 'Patiala', state: 'Punjab', type: 'Private', established: 1956, rating: 4.1, fees_min: 300000, fees_max: 450000, description: 'Reputed deemed university offering quality technical education in North India.', campus_size: '250 acres', website: 'https://www.thapar.edu', placement_rate: 83.0, avg_package: 950000, highest_package: 13000000 },
  { name: 'PSG College of Technology', location: 'Peelamedu, Coimbatore', city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private', established: 1951, rating: 4.2, fees_min: 100000, fees_max: 250000, description: 'Top autonomous engineering college in Tamil Nadu with excellent industry connections.', campus_size: '45 acres', website: 'https://www.psgtech.edu', placement_rate: 86.0, avg_package: 800000, highest_package: 12000000 },
  { name: 'Symbiosis International University', location: 'Lavale, Pune', city: 'Pune', state: 'Maharashtra', type: 'Private', established: 2002, rating: 4.0, fees_min: 350000, fees_max: 600000, description: 'Multi-disciplinary university promoting international understanding through education.', campus_size: '300 acres', website: 'https://www.siu.edu.in', placement_rate: 79.0, avg_package: 850000, highest_package: 11000000 },
  { name: 'College of Engineering Pune', location: 'Shivajinagar, Pune', city: 'Pune', state: 'Maharashtra', type: 'Public', established: 1854, rating: 4.2, fees_min: 80000, fees_max: 150000, description: 'One of the oldest engineering colleges in Asia with a storied heritage.', campus_size: '133 acres', website: 'https://www.coep.org.in', placement_rate: 85.0, avg_package: 1050000, highest_package: 14000000 },
  { name: 'Anna University', location: 'Guindy, Chennai', city: 'Chennai', state: 'Tamil Nadu', type: 'Public', established: 1978, rating: 4.1, fees_min: 60000, fees_max: 120000, description: 'Top technical university in Tamil Nadu affiliating hundreds of engineering colleges.', campus_size: '192 acres', website: 'https://www.annauniv.edu', placement_rate: 80.0, avg_package: 750000, highest_package: 11000000 },
  { name: 'Lovely Professional University', location: 'Phagwara', city: 'Phagwara', state: 'Punjab', type: 'Private', established: 2005, rating: 3.6, fees_min: 200000, fees_max: 400000, description: 'One of India\'s largest single-campus universities offering 200+ programs.', campus_size: '600 acres', website: 'https://www.lpu.in', placement_rate: 68.0, avg_package: 550000, highest_package: 7000000 },
  { name: 'IIIT Hyderabad', location: 'Gachibowli, Hyderabad', city: 'Hyderabad', state: 'Telangana', type: 'Public', established: 1998, rating: 4.5, fees_min: 200000, fees_max: 350000, description: 'Top-tier institute focused on IT and related fields with strong research output.', campus_size: '66 acres', website: 'https://www.iiit.ac.in', placement_rate: 92.0, avg_package: 1800000, highest_package: 25000000 },
  { name: 'PES University', location: 'Banashankari, Bangalore', city: 'Bangalore', state: 'Karnataka', type: 'Private', established: 1972, rating: 4.0, fees_min: 300000, fees_max: 500000, description: 'Bangalore\'s top private engineering university with focus on innovation.', campus_size: '38 acres', website: 'https://www.pes.edu', placement_rate: 80.0, avg_package: 900000, highest_package: 13000000 },
  { name: 'RV College of Engineering', location: 'Mysore Road, Bangalore', city: 'Bangalore', state: 'Karnataka', type: 'Private', established: 1963, rating: 4.1, fees_min: 200000, fees_max: 400000, description: 'One of the most reputed engineering colleges in Bangalore.', campus_size: '52 acres', website: 'https://www.rvce.edu.in', placement_rate: 84.0, avg_package: 1000000, highest_package: 14000000 },
  { name: 'National Institute of Technology Surathkal', location: 'Surathkal, Mangalore', city: 'Mangalore', state: 'Karnataka', type: 'Public', established: 1960, rating: 4.4, fees_min: 160000, fees_max: 220000, description: 'Coastal NIT with strong core engineering programs and excellent campus life.', campus_size: '295 acres', website: 'https://www.nitk.ac.in', placement_rate: 87.0, avg_package: 1250000, highest_package: 17000000 },
  { name: 'National Institute of Technology Calicut', location: 'Kozhikode', city: 'Kozhikode', state: 'Kerala', type: 'Public', established: 1961, rating: 4.3, fees_min: 150000, fees_max: 210000, description: 'Leading NIT in South India with a strong reputation for engineering and design.', campus_size: '300 acres', website: 'https://www.nitc.ac.in', placement_rate: 86.0, avg_package: 1180000, highest_package: 16000000 },
  { name: 'Indian Institute of Technology Roorkee', location: 'Roorkee', city: 'Roorkee', state: 'Uttarakhand', type: 'Public', established: 1847, rating: 4.7, fees_min: 200000, fees_max: 260000, description: 'Oldest technical institute in Asia with a rich legacy in engineering and architecture.', campus_size: '365 acres', website: 'https://www.iitr.ac.in', placement_rate: 91.0, avg_package: 1850000, highest_package: 26000000 },
  { name: 'Indian Institute of Technology Guwahati', location: 'Amingaon, Guwahati', city: 'Guwahati', state: 'Assam', type: 'Public', established: 1994, rating: 4.6, fees_min: 190000, fees_max: 240000, description: 'A modern IIT with strong research output and a scenic Brahmaputra-side campus.', campus_size: '700 acres', website: 'https://www.iitg.ac.in', placement_rate: 92.0, avg_package: 1750000, highest_package: 25000000 },
  { name: 'National Institute of Technology Rourkela', location: 'Rourkela', city: 'Rourkela', state: 'Odisha', type: 'Public', established: 1961, rating: 4.2, fees_min: 150000, fees_max: 210000, description: 'Top NIT known for strong academics, research culture, and campus infrastructure.', campus_size: '647 acres', website: 'https://www.nitrkl.ac.in', placement_rate: 85.0, avg_package: 1120000, highest_package: 15000000 },
  { name: 'Birla Institute of Technology Mesra', location: 'Mesra, Ranchi', city: 'Ranchi', state: 'Jharkhand', type: 'Private', established: 1955, rating: 4.0, fees_min: 250000, fees_max: 420000, description: 'Established technical university with a broad portfolio of engineering and science programs.', campus_size: '780 acres', website: 'https://www.bitmesra.ac.in', placement_rate: 78.0, avg_package: 820000, highest_package: 11000000 },
  { name: 'Shiv Nadar University', location: 'Dadri, Greater Noida', city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private', established: 2011, rating: 4.2, fees_min: 350000, fees_max: 650000, description: 'Research-oriented private university with a multidisciplinary academic model.', campus_size: '286 acres', website: 'https://snu.edu.in', placement_rate: 81.0, avg_package: 950000, highest_package: 12500000 },
  { name: 'Ashoka University', location: 'Rajiv Gandhi Education City, Sonipat', city: 'Sonipat', state: 'Haryana', type: 'Private', established: 2014, rating: 4.4, fees_min: 500000, fees_max: 800000, description: 'Liberal arts and sciences university focused on research, writing, and interdisciplinary learning.', campus_size: '250 acres', website: 'https://www.ashoka.edu.in', placement_rate: 74.0, avg_package: 1200000, highest_package: 15000000 },
  { name: 'University of Hyderabad', location: 'Gachibowli, Hyderabad', city: 'Hyderabad', state: 'Telangana', type: 'Public', established: 1974, rating: 4.5, fees_min: 40000, fees_max: 120000, description: 'Premier central university with top research programs across sciences and humanities.', campus_size: '2300 acres', website: 'https://uohyd.ac.in', placement_rate: 72.0, avg_package: 700000, highest_package: 10000000 },
  { name: 'Banaras Hindu University', location: 'Varanasi', city: 'Varanasi', state: 'Uttar Pradesh', type: 'Public', established: 1916, rating: 4.6, fees_min: 20000, fees_max: 90000, description: 'Historic central university with a vast academic ecosystem and diverse programs.', campus_size: '1300 acres', website: 'https://www.bhu.ac.in', placement_rate: 76.0, avg_package: 800000, highest_package: 12000000 },
  { name: 'Aligarh Muslim University', location: 'Aligarh', city: 'Aligarh', state: 'Uttar Pradesh', type: 'Public', established: 1920, rating: 4.2, fees_min: 30000, fees_max: 100000, description: 'Large public university known for engineering, medicine, and humanities.', campus_size: '1155 acres', website: 'https://www.amu.ac.in', placement_rate: 71.0, avg_package: 650000, highest_package: 9000000 },
  { name: 'Jamia Millia Islamia', location: 'Jamia Nagar, New Delhi', city: 'New Delhi', state: 'Delhi', type: 'Public', established: 1920, rating: 4.3, fees_min: 25000, fees_max: 120000, description: 'Central university with strong programs in engineering, architecture, and media studies.', campus_size: '250 acres', website: 'https://jmi.ac.in', placement_rate: 73.0, avg_package: 750000, highest_package: 11000000 },
  { name: 'Sastra Deemed University', location: 'Thanjavur', city: 'Thanjavur', state: 'Tamil Nadu', type: 'Private', established: 1984, rating: 4.0, fees_min: 180000, fees_max: 320000, description: 'Deemed university with a strong technical curriculum and good placement outcomes.', campus_size: '232 acres', website: 'https://www.sastra.edu', placement_rate: 82.0, avg_package: 900000, highest_package: 12000000 },
  { name: 'VIT-AP University', location: 'Inavolu, Amaravati', city: 'Guntur', state: 'Andhra Pradesh', type: 'Private', established: 2017, rating: 3.9, fees_min: 250000, fees_max: 420000, description: 'Modern private campus with a focus on industry-ready curricula and labs.', campus_size: '200 acres', website: 'https://vitap.ac.in', placement_rate: 79.0, avg_package: 780000, highest_package: 10000000 },
  { name: 'DY Patil International University', location: 'Akurdi, Pune', city: 'Pune', state: 'Maharashtra', type: 'Private', established: 2018, rating: 3.8, fees_min: 220000, fees_max: 380000, description: 'Emerging private university with modern infrastructure and varied professional programs.', campus_size: '100 acres', website: 'https://dypatil.edu', placement_rate: 68.0, avg_package: 600000, highest_package: 8000000 },
  { name: 'Kalinga Institute of Industrial Technology', location: 'Patia, Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha', type: 'Private', established: 1992, rating: 4.1, fees_min: 300000, fees_max: 520000, description: 'Large private university with strong technical and management offerings.', campus_size: '2500 acres', website: 'https://kiit.ac.in', placement_rate: 80.0, avg_package: 920000, highest_package: 13000000 },
  { name: 'Manipal University Jaipur', location: 'Dehmi Kalan, Jaipur', city: 'Jaipur', state: 'Rajasthan', type: 'Private', established: 2011, rating: 3.9, fees_min: 220000, fees_max: 420000, description: 'Multi-disciplinary private university with a growing engineering and management ecosystem.', campus_size: '122 acres', website: 'https://jaipur.manipal.edu', placement_rate: 72.0, avg_package: 650000, highest_package: 9500000 },
];

const coursesByType: Record<string, { name: string; duration: string; fees: number; degree_type: string; description: string }[]> = {
  engineering: [
    { name: 'Computer Science & Engineering', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Study of algorithms, data structures, AI, and software systems.' },
    { name: 'Electrical Engineering', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Covers power systems, electronics, and electrical machines.' },
    { name: 'Mechanical Engineering', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Study of design, manufacturing, and thermal systems.' },
    { name: 'Civil Engineering', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Covers structural, environmental, and transportation engineering.' },
    { name: 'Electronics & Communication', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Study of electronic devices, circuits, and communication systems.' },
    { name: 'Data Science & AI', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Modern program focusing on machine learning and data analytics.' },
  ],
  pg: [
    { name: 'M.Tech Computer Science', duration: '2 years', fees: 0, degree_type: 'M.Tech', description: 'Advanced study in computer science and research.' },
    { name: 'MBA', duration: '2 years', fees: 0, degree_type: 'MBA', description: 'Master of Business Administration program.' },
    { name: 'M.Sc Data Science', duration: '2 years', fees: 0, degree_type: 'M.Sc', description: 'Specialized masters in data science and analytics.' },
  ],
};

const topRecruiters = [
  ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
  ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'Deutsche Bank'],
  ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra'],
  ['Flipkart', 'Swiggy', 'Zomato', 'PhonePe', 'Razorpay'],
  ['Deloitte', 'EY', 'PwC', 'KPMG', 'McKinsey'],
];

const reviewTemplates = [
  { title: 'Great experience overall', pros: 'Excellent faculty, good campus', cons: 'Hostel food could be better' },
  { title: 'Worth every penny', pros: 'Amazing placements, vibrant culture', cons: 'Can be stressful during exams' },
  { title: 'Solid education', pros: 'Strong academics, good labs', cons: 'More industry exposure needed' },
  { title: 'Life-changing experience', pros: 'Diverse community, world-class research', cons: 'Location could be more urban' },
];

const names = ['Arjun Sharma', 'Priya Patel', 'Rahul Verma', 'Sneha Iyer', 'Amit Kumar', 'Divya Reddy', 'Rohan Singh', 'Kavya Nair'];

const seedDatabase = async () => {
  // Ensure each state has at least MIN_PER_STATE colleges by augmenting the base list
  const MIN_PER_STATE = 10;
  const finalColleges = [...colleges];
  const stateCounts: Record<string, number> = finalColleges.reduce((acc, c) => {
    acc[c.state] = (acc[c.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const states = Object.keys(stateCounts);
  for (const state of states) {
    while ((stateCounts[state] || 0) < MIN_PER_STATE) {
      const n = (stateCounts[state] || 0) + 1;
      const name = `${state} Institute of Technology ${n}`;
      const city = `${state} City ${n}`;
      const location = `${city}`;
      const type = Math.random() > 0.5 ? 'Public' : 'Private';
      const established = 1950 + Math.floor(Math.random() * 70);
      const rating = +(3 + Math.random() * 2).toFixed(1);
      const fees_min = 50000 + Math.floor(Math.random() * 200000);
      const fees_max = fees_min + 100000 + Math.floor(Math.random() * 400000);
      const description = `Auto-generated college in ${state} to meet seeding requirements.`;
      const campus_size = `${50 + Math.floor(Math.random() * 500)} acres`;
      const website = `https://www.${name.replace(/\s+/g, '').toLowerCase()}.edu`;
      const placement_rate = 60 + Math.floor(Math.random() * 40);
      const avg_package = 300000 + Math.floor(Math.random() * 1200000);
      const highest_package = Math.floor(avg_package * (3 + Math.floor(Math.random() * 8)));

      finalColleges.push({
        name,
        location,
        city,
        state,
        type,
        established,
        rating,
        fees_min,
        fees_max,
        description,
        campus_size,
        website,
        placement_rate,
        avg_package,
        highest_package,
      });

      stateCounts[state] = (stateCounts[state] || 0) + 1;
    }
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Clear existing data
    await client.query('DELETE FROM saved_comparisons');
    await client.query('DELETE FROM saved_colleges');
    await client.query('DELETE FROM reviews');
    await client.query('DELETE FROM placements');
    await client.query('DELETE FROM courses');
    await client.query('DELETE FROM colleges');

    // Ensure each college has an image_url and tags
    const tagPool = ['engineering', 'management', 'research', 'technology', 'liberal-arts', 'medical', 'design', 'science', 'private', 'public', 'autonomous', 'government'];
    const pickTags = (count = 3) => {
      return Array.from({ length: count }, () => tagPool[Math.floor(Math.random() * tagPool.length)]).filter((v, i, a) => a.indexOf(v) === i);
    };

    for (const college of finalColleges) {
      const c = college as any;
      if (!c.image_url) {
        c.image_url = getCollegeImage(c.name);
      }
      if (!c.tags) {
        c.tags = pickTags(3);
      }
    }

    for (const college of finalColleges) {
      const c = college as any;
      const result = await client.query(
        `INSERT INTO colleges (name, location, city, state, type, established, rating, fees_min, fees_max, description, image_url, campus_size, website, placement_rate, avg_package, highest_package, tags)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING id`,
        [c.name, c.location, c.city, c.state, c.type, c.established, c.rating, c.fees_min, c.fees_max, c.description, c.image_url, c.campus_size, c.website, c.placement_rate, c.avg_package, c.highest_package, c.tags]
      );
      const collegeId = result.rows[0].id;

      // Add courses
      const allCourses = [...coursesByType.engineering, ...coursesByType.pg];
      const numCourses = 4 + Math.floor(Math.random() * 5);
      const selectedCourses = allCourses.sort(() => Math.random() - 0.5).slice(0, numCourses);
      for (const course of selectedCourses) {
        const fees = college.fees_min + Math.floor(Math.random() * (college.fees_max - college.fees_min));
        await client.query(
          `INSERT INTO courses (college_id, name, duration, fees, degree_type, description) VALUES ($1,$2,$3,$4,$5,$6)`,
          [collegeId, course.name, course.duration, fees, course.degree_type, course.description]
        );
      }

      // Add placements for 3 years
      for (let year = 2022; year <= 2024; year++) {
        const variation = (Math.random() - 0.5) * 6;
        const recruiterSet = topRecruiters[Math.floor(Math.random() * topRecruiters.length)];
        await client.query(
          `INSERT INTO placements (college_id, year, placement_rate, avg_package, highest_package, students_placed, total_students, top_recruiters)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [collegeId, year, Math.min(100, (college.placement_rate || 70) + variation), (college.avg_package || 500000) * (0.9 + Math.random() * 0.2), (college.highest_package || 2000000) * (0.9 + Math.random() * 0.2), Math.floor(200 + Math.random() * 300), Math.floor(300 + Math.random() * 200), recruiterSet]
        );
      }

      // Add reviews
      const numReviews = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numReviews; i++) {
        const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
        const author = names[Math.floor(Math.random() * names.length)];
        const rating = Math.max(1, Math.min(5, (college.rating || 3) + (Math.random() - 0.5) * 2));
        await client.query(
          `INSERT INTO reviews (college_id, author, rating, title, comment, pros, cons) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [collegeId, author, Math.round(rating * 10) / 10, template.title, `${template.title}. ${college.name} has been a wonderful institution for my education.`, template.pros, template.cons]
        );
      }
    }

    await client.query('COMMIT');
    console.log(`✅ Seeded ${finalColleges.length} colleges with courses, placements, and reviews`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding:', error);
    throw error;
  } finally {
    client.release();
  }
};

export default seedDatabase;

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Seed failed:', error);
      process.exit(1);
    });
}
