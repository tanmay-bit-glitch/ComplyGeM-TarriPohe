import { AuthUser } from '../types';

export const DEMO_OFFICER_USER: AuthUser = {
  id: 'user-officer-1',
  role: 'PROCUREMENT_OFFICER',
  name: 'Shri Arvind K. Rao',
  designationOrEntity: 'Chief Procurement & Evaluation Officer',
  departmentOrCompany: 'GeM Central Evaluation Cell • Defence & Paramilitary Wing',
  email: 'arvind.rao@gem.gov.in',
  identifierNumber: 'GEM-OFF-4891',
  avatarInitials: 'AR',
  lastLogin: '2026-08-07 09:30 AM IST',
};

export const DEMO_BIDDER_USERS: (AuthUser & {
  companyDetails: {
    bidderName: string;
    bidderEmail: string;
    bidderPhone: string;
    panNumber: string;
    gstinNumber: string;
    udyamNumber?: string;
    cinNumber?: string;
    registeredState: string;
    enterpriseType: 'MICRO' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'STARTUP';
    annualTurnover: string;
    primarySector: string;
    defaultTenderId?: string;
  };
})[] = [
  {
    id: 'user-bidder-1',
    role: 'BIDDER',
    name: 'Tariq Ahmad Bhat',
    designationOrEntity: 'Himalayan Defence & Agro Machines Pvt Ltd',
    departmentOrCompany: 'Small Enterprise • Jammu & Kashmir (Class-I MSE)',
    email: 'tenders@himalayanagro.in',
    identifierNumber: 'GEM-VND-98210',
    avatarInitials: 'HD',
    lastLogin: '2026-08-07 10:15 AM IST',
    companyDetails: {
      bidderName: 'Himalayan Defence & Agro Machines Pvt Ltd',
      bidderEmail: 'tenders@himalayanagro.in',
      bidderPhone: '+91 94191 22840',
      panNumber: 'AAACH8841E',
      gstinNumber: '01AAACH8841E1Z3',
      udyamNumber: 'UDYAM-JK-08-0012491',
      cinNumber: 'U29210JK2018PTC009412',
      registeredState: 'Jammu and Kashmir',
      enterpriseType: 'SMALL',
      annualTurnover: '₹18.4 Lakhs',
      primarySector: 'Heavy Duty Agro & Shrub Master Machines',
      defaultTenderId: 'tender-iaf-shrub',
    },
  },
  {
    id: 'user-bidder-2',
    role: 'BIDDER',
    name: 'Sanjeev K. Oswal',
    designationOrEntity: 'Vardhman Tactical & Defence Fabrics Ltd',
    departmentOrCompany: 'Large Composite Mill • Punjab (NIC 13121)',
    email: 'defence.tenders@vardhmantextiles.in',
    identifierNumber: 'GEM-VND-74192',
    avatarInitials: 'VT',
    lastLogin: '2026-08-06 04:45 PM IST',
    companyDetails: {
      bidderName: 'Vardhman Tactical & Defence Fabrics Ltd',
      bidderEmail: 'defence.tenders@vardhmantextiles.in',
      bidderPhone: '+91 161 2228943',
      panNumber: 'AAACV4918G',
      gstinNumber: '03AAACV4918G1Z7',
      udyamNumber: 'UDYAM-PB-12-0004910',
      cinNumber: 'L17111PB1973PLC003345',
      registeredState: 'Punjab',
      enterpriseType: 'LARGE',
      annualTurnover: '₹82.4 Crores',
      primarySector: 'Technical Textiles & Disruptive Uniform Cloth',
      defaultTenderId: 'tender-bsf-uniform',
    },
  },
  {
    id: 'user-bidder-3',
    role: 'BIDDER',
    name: 'Vikramaditya Sehgal',
    designationOrEntity: 'Apex Combat Outfits & Uniforms LLP',
    departmentOrCompany: 'Medium Enterprise • New Delhi (Tactical Apparel)',
    email: 'bids@apexcombat.in',
    identifierNumber: 'GEM-VND-33190',
    avatarInitials: 'AC',
    lastLogin: '2026-08-07 11:00 AM IST',
    companyDetails: {
      bidderName: 'Apex Combat Outfits & Uniforms LLP',
      bidderEmail: 'bids@apexcombat.in',
      bidderPhone: '+91 11 4981 7200',
      panNumber: 'AAZFA3319K',
      gstinNumber: '07AAZFA3319K1ZM',
      udyamNumber: 'UDYAM-DL-02-0098412',
      cinNumber: 'AAP-8419',
      registeredState: 'Delhi',
      enterpriseType: 'MEDIUM',
      annualTurnover: '₹1.45 Crores',
      primarySector: 'Defence Garments & Uniform Tailoring',
      defaultTenderId: 'tender-bsf-uniform',
    },
  },
  {
    id: 'user-bidder-4',
    role: 'BIDDER',
    name: 'Gurvinder Singh',
    designationOrEntity: 'Northern Spares & Tractors Corporation',
    departmentOrCompany: 'Micro Enterprise • Jammu & Kashmir (Auto Parts & Dealership)',
    email: 'sales@northerntractors.in',
    identifierNumber: 'GEM-VND-99201',
    avatarInitials: 'NS',
    lastLogin: '2026-08-05 02:20 PM IST',
    companyDetails: {
      bidderName: 'Northern Spares & Tractors Corporation',
      bidderEmail: 'sales@northerntractors.in',
      bidderPhone: '+91 191 2471920',
      panNumber: 'AAACN9920D',
      gstinNumber: '01AAACN9920D1Z1',
      udyamNumber: 'UDYAM-JK-05-0008124',
      cinNumber: 'U50300JK2016PTC008192',
      registeredState: 'Jammu and Kashmir',
      enterpriseType: 'MICRO',
      annualTurnover: '₹42.8 Lakhs',
      primarySector: 'Escort 6065 Tractor Spares & Heavy Transport Spares',
      defaultTenderId: 'tender-bro-tractor',
    },
  },
  {
    id: 'user-bidder-5',
    role: 'BIDDER',
    name: 'Rameshwar Nath Sharma',
    designationOrEntity: 'NCR EcoBuild Concretes & Infrastructures Ltd',
    departmentOrCompany: 'Small Enterprise • Uttar Pradesh (IS:6041 AAC Blocks)',
    email: 'gem.bids@ncrecobuild.com',
    identifierNumber: 'GEM-VND-44199',
    avatarInitials: 'NE',
    lastLogin: '2026-08-07 08:50 AM IST',
    companyDetails: {
      bidderName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
      bidderEmail: 'gem.bids@ncrecobuild.com',
      bidderPhone: '+91 120 4882190',
      panNumber: 'AAACN4419M',
      gstinNumber: '09AAACN4419M1ZR',
      udyamNumber: 'UDYAM-UP-28-0041920',
      cinNumber: 'U26940UP2017PLC098214',
      registeredState: 'Uttar Pradesh',
      enterpriseType: 'SMALL',
      annualTurnover: '₹3.62 Crores',
      primarySector: 'Autoclaved Aerated Concrete Blocks (IS:6041 Grade-I)',
      defaultTenderId: 'tender-itbp-aac',
    },
  },
];

export const DEMO_BIDDER_USER = DEMO_BIDDER_USERS[0];
