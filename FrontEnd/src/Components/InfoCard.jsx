import React from "react";

const InfoCard = ({ title, content, emoji }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-md">
      <h2 className="text-2xl font-bold mb-2">
        {title}{" "}
        {emoji && (
          <span role="img" aria-label={title}>
            {emoji}
          </span>
        )}
      </h2>
      {Array.isArray(content) ? (
        <ul className="list-disc pl-5">
          {content.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

export default InfoCard;
