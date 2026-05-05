export const policyData = {
  categories: [
    {
      id: "termos",
      title: "Acordos de Cliente e Usuário",
      documents: [
        {
          id: "termo-video-sinal",
          title: "Termo de Autorização para Submissão de Vídeo-Sinal",
          versions: [
            {
              version: "1.0",
              effectiveDate: "29 de Maio de 2026",
              fileName: "PESQUISA SOBRE SINALÁRIOS EM LIBRAS E ÍCONES.pdf",
            },
          ],
        },
      ],
    },
  ],
};

export function getPolicyDocumentById(documentId) {
  for (const category of policyData.categories) {
    const found = category.documents?.find((doc) => doc.id === documentId);
    if (found) return found;
  }
  return null;
}

export function getLatestPolicyVersion(documentId) {
  const doc = getPolicyDocumentById(documentId);
  if (!doc?.versions?.length) return null;
  return doc.versions[doc.versions.length - 1];
}
