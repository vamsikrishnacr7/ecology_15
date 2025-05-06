// src/components/CaseDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const caseDetails = {
  "Hydra": {
    image: "img/hydra.png",
    title: "Hydra",
    description: "Hydra case description goes here."
  },
  "Bhopal Tragedy": {
    image: "img/bhopal.jpg",
    title: "Bhopal Tragedy",
    description: "Bhopal gas leak incident details."
  },
  "Katrina Hurricane": {
    image: "img/neworleans.jpg",
    title: "Katrina Hurricane",
    description: "The devastation caused by Hurricane Katrina."
  },
  "Encroachment Jakarta": {
    image: "img/jakarta.jpg",
    title: "Encroachment Jakarta",
    description: "Encroachment issues in Jakarta."
  }
};

const CaseDetail = () => {
  const { caseId } = useParams();
  const caseInfo = caseDetails[caseId];

  if (!caseInfo) {
    return <div className="text-center text-red-500 mt-10">Case not found!</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{caseInfo.title}</h1>
      <img src={`/${caseInfo.image}`} alt={caseInfo.title} className="w-full h-80 object-cover rounded-lg mb-4" />
      <p className="text-lg text-gray-700">{caseInfo.description}</p>
    </div>
  );
};

export default CaseDetail;
