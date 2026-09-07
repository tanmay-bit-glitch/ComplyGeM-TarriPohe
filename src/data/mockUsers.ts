import { AuthUser } from '../types';

export const DEMO_OFFICER_USER: AuthUser = {
  id: 'user-officer-1',
  role: 'PROCUREMENT_OFFICER',
  name: 'Shri Arvind K. Rao',
  designationOrEntity: 'Chief Procurement & Evaluation Officer',
  departmentOrCompany: 'Ministry of Commerce & Industry • GeM Evaluation Cell',
  email: 'arvind.rao@gem.gov.in',
  identifierNumber: 'GEM-OFF-4891',
  avatarInitials: 'AR',
  lastLogin: '2026-09-07 09:30 AM IST',
};

export const DEMO_BIDDER_USER: AuthUser = {
  id: 'user-bidder-1',
  role: 'BIDDER',
  name: 'Rajesh Sharma',
  designationOrEntity: 'Bharat Infotech & Electronics Solutions Ltd.',
  departmentOrCompany: 'Class-I Local Supplier (Udyam: UDYAM-MH-12-0048921)',
  email: 'bids@bharat-infotech.com',
  identifierNumber: 'GEM-VND-98210',
  avatarInitials: 'BI',
  lastLogin: '2026-09-07 10:15 AM IST',
};
