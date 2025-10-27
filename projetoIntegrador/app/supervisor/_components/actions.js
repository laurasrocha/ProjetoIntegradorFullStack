
const STORAGE_KEY = 'projetosIntegradores';

export function getProjects() {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function updateProjectStatus(id, newStatus) {
  const projects = getProjects();
  const updated = projects.map(project =>
    project.id === id ? { ...project, status: newStatus } : project
  );
  saveProjects(updated);
}

export function addProject(project) {
  const projects = getProjects();
  const newList = [...projects, project];
  saveProjects(newList);
}

export function deleteProject(id) {
  const projects = getProjects();
  const updated = projects.filter((project) => project.id !== id);
  saveProjects(updated);
}

