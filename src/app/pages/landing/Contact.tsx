import { Footer, Navbar } from "@/app/components/common";
import { Container } from "@/app/components/layout";
import { Button } from "@/app/components/ui";

interface ContactProps {
  embedded?: boolean;
}

type ContactRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "Active" | "Inactive";
  button: string;
};

const contacts: ContactRecord[] = [
  {
    id: "CNT-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@acmecorp.com",
    phone: "+91 98765 43210",
    company: "Acme Corp",
    status: "Active",
    button: "Send Message",
  },
  {
    id: "CNT-002",
    name: "Olivia Turner",
    email: "olivia.turner@northwind.io",
    phone: "+1 (415) 555-0192",
    company: "Northwind",
    status: "Active",
    button: "Send Message",
  },
  {
    id: "CNT-003",
    name: "Liam Chen",
    email: "liam.chen@globex.com",
    phone: "+1 (628) 555-0107",
    company: "Globex",
    status: "Inactive",
    button: "Send Message",
  },
  {
    id: "CNT-004",
    name: "Fatima Noor",
    email: "fatima.noor@everline.ai",
    phone: "+971 50 123 4567",
    company: "Everline AI",
    status: "Active",
    button: "Send Message",
  },
  {
    id: "CNT-005",
    name: "Noah Williams",
    email: "noah.williams@zenroute.co",
    phone: "+44 20 7946 0958",
    company: "ZenRoute",
    status: "Inactive",
    button: "Send Message",
  },
];

const Contact = ({ embedded = false }: ContactProps) => {
  return (
    <div className="bg-white min-h-screen">
      {!embedded && <Navbar />}

      <main
        className={`${embedded ? "pt-6" : "pt-28"} pb-20 px-4 sm:px-6 lg:px-px`}
      >
        <Container>
          <div className="mb-8">
            <h1 className="h4-bold-24 text-base-black">
              Manage all your contacts
            </h1>
            <p className="h5-regular-16 text-grey-medium mt-2">
              View and manage your complete contact list in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-grey-light overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-primary/5 border-b border-grey-light">
                  <tr>
                    <th className="px-5 py-4 body-bold-16 text-grey">ID</th>
                    <th className="px-5 py-4 body-bold-16 text-grey">Name</th>
                    <th className="px-5 py-4 body-bold-16 text-grey">Email</th>
                    <th className="px-5 py-4 body-bold-16 text-grey">Phone</th>
                    <th className="px-5 py-4 body-bold-16 text-grey">
                      Company
                    </th>
                    <th className="px-5 py-4 body-bold-16 text-grey">Status</th>
                    <th className="px-5 py-4 body-bold-16 text-grey">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="border-b border-grey-light last:border-b-0"
                    >
                      <td className="px-5 py-4 body-medium-16 text-grey">
                        {contact.id}
                      </td>
                      <td className="px-5 py-4 body-medium-16 text-base-black">
                        {contact.name}
                      </td>
                      <td className="px-5 py-4 body-medium-16 text-grey">
                        {contact.email}
                      </td>
                      <td className="px-5 py-4 body-medium-16 text-grey">
                        {contact.phone}
                      </td>
                      <td className="px-5 py-4 body-medium-16 text-grey">
                        {contact.company}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                            contact.status === "Active"
                              ? "bg-success/15 text-success"
                              : "bg-warning/15 text-warning"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Button variant="primary" label={contact.button} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </main>

      {!embedded && <Footer />}
    </div>
  );
};

export default Contact;
