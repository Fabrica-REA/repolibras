import { useEffect, useMemo, useState } from "react";
import "../assets/css/politicas.css";
import { base } from "../utils/Utilidades";
import TermoVideoSinal from "../components/politicas/termos/TermoVideoSinal";
import { policyData } from "../data/policyData";

const Politicas = () => {
    const [activeSection, setActiveSection] = useState("");
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
        termos: true,
    });

    const defaultSelectedVersions = useMemo(() => {
        const initial: Record<string, string> = {};
        for (const category of policyData.categories) {
            for (const doc of category.documents ?? []) {
                const latest = doc.versions?.[doc.versions.length - 1];
                if (latest?.version) initial[doc.id] = latest.version;
            }
        }
        return initial;
    }, []);

    const [selectedVersionByDoc, setSelectedVersionByDoc] = useState<Record<string, string>>(
        defaultSelectedVersions
    );

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    setActiveSection(entry.target.id);
                    for (const cat of policyData.categories) {
                        if (cat.documents?.some((doc) => doc.id === entry.target.id)) {
                            setExpandedCategories((prev) => ({ ...prev, [cat.id]: true }));
                        }
                    }
                });
            },
            { rootMargin: "-20% 0px -70% 0px" }
        );

        for (const cat of policyData.categories) {
            for (const doc of cat.documents ?? []) {
                const element = document.getElementById(doc.id);
                if (element) observer.observe(element);
            }
        }

        return () => observer.disconnect();
    }, []);

    const handleFilePreview = (categoryId: string, version: string, fileName: string) => {
        return window.open(
            `${base}static/politicas/${categoryId}/${version}/${fileName}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div className="legal-container">
            <aside className="legal-sidebar">
                <nav className="sidebar-nav">
                    <ul className="category-list">
                        {policyData.categories.map((cat) => (
                            <li key={cat.id} className="category-item">
                                <button
                                    className={`category-toggle ${expandedCategories[cat.id] ? "expanded" : ""}`}
                                    onClick={() => toggleCategory(cat.id)}
                                    type="button"
                                >
                                    {cat.title}
                                    <i className={`pi pi-chevron-${expandedCategories[cat.id] ? "down" : "right"}`}></i>
                                </button>
                                {expandedCategories[cat.id] && (
                                    <ul className="section-list">
                                        {(cat.documents ?? []).map((doc) => (
                                            <li key={doc.id}>
                                                <a href={`#${doc.id}`} className={activeSection === doc.id ? "active" : ""}>
                                                    {doc.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="legal-content">
                {policyData.categories.map((cat) => (
                    <div key={cat.id} className="policy-category-block">
                        {(cat.documents ?? []).map((doc) => {
                            const selectedVersion = selectedVersionByDoc[doc.id] ?? doc.versions?.[0]?.version ?? "";
                            const versionMeta = doc.versions?.find((v) => v.version === selectedVersion) ?? doc.versions?.[0];
                            const latestMeta = doc.versions?.[doc.versions.length - 1];

                            return (
                                <section id={doc.id} key={doc.id} className="policy-section">
                                    <h2>
                                        <a href={`#${doc.id}`} className="heading-anchor-wrapper a-heading">
                                            <span className="heading-anchor">#</span> {doc.title}
                                        </a>
                                    </h2>

                                    <div className="metadata">
                                        <div className="metadata-item">
                                            <span className="metadata-label">Última atualização</span>
                                            <span className="effective-date">{latestMeta?.effectiveDate ?? ""}</span>
                                        </div>

                                        <div className="metadata-item">
                                            <label htmlFor={`version-select-${doc.id}`} className="metadata-label">
                                                Veja todas as versões
                                            </label>
                                            <div className="version-picker">
                                                <select
                                                    id={`version-select-${doc.id}`}
                                                    value={selectedVersion}
                                                    onChange={(e) =>
                                                        setSelectedVersionByDoc((prev) => ({ ...prev, [doc.id]: e.target.value }))
                                                    }
                                                >
                                                    {(doc.versions ?? []).map((v) => (
                                                        <option key={v.version} value={v.version}>
                                                            {v.effectiveDate}
                                                        </option>
                                                    ))}
                                                </select>

                                                <button
                                                    type="button"
                                                    className="download-circle-btn"
                                                    title="Visualizar Documento"
                                                    aria-label={`Visualizar versão ${selectedVersion}`}
                                                    onClick={() => {
                                                        if (!versionMeta?.fileName) return;
                                                        handleFilePreview(cat.id, selectedVersion, versionMeta.fileName);
                                                    }}
                                                >
                                                    <i className="pi pi-file"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {doc.id === "termo-video-sinal" ? (
                                        <TermoVideoSinal />
                                    ) : (
                                        <p>Documento em construção.</p>
                                    )}
                                </section>
                            );
                        })}
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Politicas;
