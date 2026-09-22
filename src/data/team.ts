/**
 * =============================================================================
 * MKSAA TEAM ROSTER
 * =============================================================================
 *
 * The one list behind the Our Team page. Everyone appears in a single gallery,
 * in the order they are listed here — sales staff first, then everyone else.
 *
 * TO ADD SOMEONE:
 *   1. Put their headshot in `src/assets/images/team/` (First-Last.jpg or .png)
 *   2. Add an `import` for it at the top of this file
 *   3. Add an entry to the array below, in the position you want them shown
 *
 * TO REMOVE SOMEONE: delete (or comment out) their entry. Leaving the image
 * import behind is harmless.
 *
 * `bio` may be left as "" — the modal just won't show a bio. Use \n\n between
 * paragraphs if a bio runs long; they render as separate paragraphs.
 * `phone` is optional; leave it off for anyone who shouldn't be called directly.
 * =============================================================================
 */

import type { ImageMetadata } from "astro";

// Sales
import AndyHansen from "../assets/images/team/Andy-Hansen.jpg";
import CodyDale from "../assets/images/team/Cody-Dale-new.png";
import BrendaNayelyMacias from "../assets/images/team/Brenda-Nayely-Macias.jpg";
import KendallDuvall from "../assets/images/team/Kendall-Duvall.png";
import BillDoll from "../assets/images/team/Bill-Doll.png";
import CarmenBaeza from "../assets/images/team/Carmen-Baeza.png";

// Everyone else
import BrendaChatfield from "../assets/images/team/Brenda-Chatfield.png";
import KevinHouse from "../assets/images/team/Kevin-House.jpg";
import StevenAkers from "../assets/images/team/Steven-Akers.jpg";
import LisaBahruth from "../assets/images/team/Lisa-Bahruth.jpg";
import BrittanyMannie from "../assets/images/team/Brittany-Mannie.jpg";
import TrinaLatham from "../assets/images/team/Trina-Latham.jpg";
import AnnColling from "../assets/images/team/Ann-Colling.jpg";
import PattiKane from "../assets/images/team/Patti-Kane.jpg";
import AbbeyGarnett from "../assets/images/team/Abbey-Garnett.jpg";
import SamuelJones from "../assets/images/team/Samuel-Jones.jpg";

export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  email: string;
  phone?: string;
  image_url: ImageMetadata;
}

/** Display order on the Our Team page. Sales first, then everyone else. */
export const team: TeamMember[] = [
  {
    name: "Andy Hansen",
    position: "Sales Representative",
    bio: "Andy’s desk is located in the Sales Office of the main building but he is often out and about mingling and creating relationships with new dealers and checking in on his regulars to make sure they are seeing their best personal results.",
    email: "andyh@mksaa.com",
    phone: "316-866-9009",
    image_url: AndyHansen,
  },
  {
    name: "Cody Dale",
    position: "Fleet Lease/Commercial Sales Representative",
    bio: "We are excited to have Cody Dale rejoin our MKSAA team as a Sales Representative in early 2025. Her role will focus on consigning and selling wholesale vehicles. Cody is particularly eager to dive back into the lively atmosphere of a physical auction.",
    email: "codyd@mksaa.com",
    phone: "316-866-9203",
    image_url: CodyDale,
  },
  {
    name: "Brenda Nayely Macías",
    position: "Sales Representative",
    bio: "Brenda is thrilled to return to the MKSAA team, she brings a passion for sales, relationship-building, and customer service. She always knew the automotive world was where she belonged. With over a decade of experience across the automotive and finance industries. Known for her ability to build genuine connections, Brenda takes a customer-first approach in everything she does. ",
    email: "brendac@mksaa.com",
    phone: "316-866-9041",
    image_url: BrendaNayelyMacias,
  },
  {
    name: "Kendall Duvall",
    position: "Inside Sales Coordinator",
    bio: "",
    email: "kendalld@mksaa.com",
    phone: "520-345-4411",
    image_url: KendallDuvall,
  },
  {
    name: "Bill Doll",
    position: "Sales Representative",
    bio: "I am happy to announce that I have joined the Mid Kansas Auto Auction (MKSAA) family! My passion is helping auto dealers buy and sell inventory with maximum speed, value, and simplicity. From full-service vehicle detailing, in-house mechanical inspections, and fast title processing to transportation logistics and 24/7 online bidding, MKSAA is your full-service solution from start to finish.\n\nCall or text me at (316) 866-9156 to get registered or to discuss inventory strategies.\n\nOutside of the lanes, I’m usually enjoying time with family and friends, watching football, fishing, gardening, or spending time with my dog, Boomer.",
    email: "billd@mksaa.com",
    phone: "316-866-9156",
    image_url: BillDoll,
  },
  {
    name: "Carmen Baeza",
    position: "Inside Sales Representative",
    bio: "",
    email: "carmenb@mksaa.com",
    phone: "316-866-9266",
    image_url: CarmenBaeza,
  },
  {
    name: "Brenda Chatfield",
    position: "Office Manager",
    bio: "",
    email: "brendach@mksaa.com",
    image_url: BrendaChatfield,
  },
  {
    name: "Kevin House",
    position: "Transportation Coordinator",
    bio: "House is located in the back building at the entrance of our gate. He is responsible for scheduling our drivers to pick up and drop off cars at our client dealerships before and after sale day.",
    email: "kevinh@mksaa.com",
    image_url: KevinHouse,
  },
  {
    name: "Steven Akers",
    position: "Automotive Claims Specialist",
    bio: "Steven works directly with our dealers to solve arbitration cases that are opened. He is constantly on the move researching details about the cases in an effort to create a win-win-win scenario for buyers, sellers and the auction alike.",
    email: "stevena@mksaa.com",
    image_url: StevenAkers,
  },
  {
    name: "Lisa Talbott",
    position: "Title Clerk",
    bio: "Lisa is our longest-employed title clerk at our front desk processing paperwork and titles for our dealers daily. She can name almost every dealer from the time they walk in the door and greets everyone with a smile. ",
    email: "lisab@mksaa.com",
    image_url: LisaBahruth,
  },
  {
    name: "Brittany Mannie",
    position: "Frontier Financial Title Clerk",
    bio: "Brittany serves as the title clerk at Frontier Financial, where she handles everyday paperwork and titles for our dealers at the front desk. What excites her most about working at MKSAA is the opportunity for new adventures and the chance to learn new things.",
    email: "brittanym@frontierfinancialusa.com",
    image_url: BrittanyMannie,
  },
  {
    name: "Trina Latham",
    position: "Fastback Title Clerk",
    bio: "Trina became a part of the MKSAA team in early 2025, taking on the role of Title Clerk. Her primary responsibilities involve securing repossession titles. Trina eagerly anticipates new experiences and is excited about the opportunity to develop her career within the company.",
    email: "titles@fastbacktitlesks.com",
    image_url: TrinaLatham,
  },
  {
    name: "Ann Colling",
    position: "Accounting Clerk",
    bio: "Ann is located in the back building where she helps manage invoices, payroll and monthly transactions as needed.",
    email: "annc@mksaa.com",
    image_url: AnnColling,
  },
  {
    name: "Patti Kane",
    position: "Accounting Clerk",
    bio: "Patti’s main focus is to help accounting get through paperwork in a timely and efficient manner by assisting with filing, entering and scanning documents. ",
    email: "pattik@mksaa.com",
    image_url: PattiKane,
  },
  {
    name: "Abbey Garnett",
    position: "Accounting Clerk",
    bio: "Abbey will support the accounting department by preparing monthly reports, managing overall financials, and handling tasks such as reconciliation, data entry, filing, and tracking departmental budgets.",
    email: "abbeyg@mksaa.com",
    image_url: AbbeyGarnett,
  },
  {
    name: "Samuel Jones",
    position: "Maintenance",
    bio: "Samuel is our favorite man in the main building for always keeping it spick and span. He is in charge of the upkeep of the main building and all of the lanes, which after a sale day around here is quite the job! If you need to find him you better be quick because he is always on the move making something better than he found it.",
    email: "",
    image_url: SamuelJones,
  },
];
