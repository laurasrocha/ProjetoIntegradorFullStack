// ProjectsGrid.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { getProjects } from './actions';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid() {
  const [projects, setProjects] = useState([]);

  const loadProjects = () => {
    const data = getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="mt-10 px-6">
      <h1 className="text-center text-black dark:text-[#f29100] text-xl font-bold mb-6">
        Todos os projetos em andamento
      </h1>

      <div className="flex flex-wrap text-black justify-center gap-6">
        {projects.length === 0 ? (
          <p className="text-black dark:text-[#f29100]">Nenhum projeto cadastrado.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onStatusChange={loadProjects}
            />
          ))
        )}
      </div>
    </div>
  );
}
