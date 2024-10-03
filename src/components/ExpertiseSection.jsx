import { useState } from 'react';
import { useLanguage } from './LanguageProvider'; // Adjust the path based on your file structure
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons for expand/collapse indicators

const ExpertiseSection = () => {
  const { content } = useLanguage();
  const expertise = content.expertise; // Accessing expertise data from the language files

  // State to track expanded rows
  const [expandedRow, setExpandedRow] = useState(null);

  // Function to toggle row expansion
  const toggleRow = (row) => {
    setExpandedRow(expandedRow === row ? null : row);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{expertise.page_title}</h2>

        <div className="grid grid-cols-1 gap-1"> {/* Minimal spacing between rows */}
          {expertise.practices.map(({ key, title, generalDescription, roleAndInvolvement }) => (
            <div key={key} className="w-full bg-white rounded mb-1"> {/* No shadow, spans full width */}
              <div
                className="flex items-center justify-between p-6 cursor-pointer border-b bg-gray-200" // Subtitle background
                onClick={() => toggleRow(key)}
              >
                <h4 className="text-2xl font-semibold">{title}</h4>
                {/* Expand/collapse indicator */}
                {expandedRow === key ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </div>
              {expandedRow === key && (
                <div className="p-4">
                  <p className="mb-4">{generalDescription}</p>
                  <ul className="list-disc list-inside">
                    {Object.entries(roleAndInvolvement).map(([roleKey, value]) => (
                      <li key={roleKey} className="mb-2">
                        <strong>{roleKey.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
