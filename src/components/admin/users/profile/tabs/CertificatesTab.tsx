"use client";
import { CustomImage } from "@/components/custom";

interface Certificate {
  id: string;
  title: string;
  image: string;
  date: string;
}

interface CertificatesTabProps {
  userId: string;
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    title: "Designing for Dark Mode",
    image: "/work.jpg",
    date: "25 Aug 2025",
  },
  {
    id: "2",
    title: "Designing for Dark Mode",
    image: "/work.jpg",
    date: "25 Aug 2025",
  },
  {
    id: "3",
    title: "Designing for Dark Mode",
    image: "/work.jpg",
    date: "25 Aug 2025",
  },
  {
    id: "4",
    title: "Designing for Dark Mode",
    image: "/work.jpg",
    date: "25 Aug 2025",
  },
  {
    id: "5",
    title: "Designing for Dark Mode",
    image: "/work.jpg",
    date: "25 Aug 2025",
  },
  {
    id: "6",
    title: "Designing for Dark Mode",
    image: "/work.jpg",
    date: "25 Aug 2025",
  },
  {
    id: "7",
    title: "Designing for Dark Mode",
    image: "/work.jpg",
    date: "25 Aug 2025",
  },
  {
    id: "8",
    title: "Designing for Dark Mode",
    image: "/work.jpg",
    date: "25 Aug 2025",
  },
];

export default function CertificatesTab({ userId }: CertificatesTabProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCertificates.map((certificate) => (
          <div
            key={certificate.id}
            className="border border-gray-200 rounded-xl p-3"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <CustomImage
                  src={certificate.image}
                  alt={certificate.title}
                  width={80}
                  height={60}
                  className="w-15 h-15 object-cover rounded border"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {certificate.title}
                </h3>
                <p className="text-xs text-gray-600">{certificate.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
