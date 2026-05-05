import "../../../assets/css/politicas.css";

const TermoVideoSinal = ({ acceptance } = {}) => {
    const acceptanceChecked = acceptance?.checked ?? false;
    const acceptanceDisabled = acceptance?.disabled ?? true;
    const onAcceptanceChange = acceptance?.onChange;

    return (
        <div className="policy-structured-content">
            <div className="policy-subsection">
                <a id="1-cabecalho-institucional" href="#1-cabecalho-institucional" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 1. CABEÇALHO INSTITUCIONAL</a>
                <p>Este documento constitui o instrumento legal que regula a participação de colaboradores no projeto  <span className="bold-text">SINGCONVERSE — Glossário em Libras</span>, vinculado à <span className="bold-text">Universidade Federal do Paraná (UFPR)</span>. O presente termo estabelece as condições para a submissão, armazenamento e exibição de conteúdos em vídeo destinados à composição do acervo digital da instituição.</p>
            </div>

            <div className="policy-subsection">
                <a id="2-preambulo-e-objetivos" href="#2-preambulo-e-objetivos" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 2. PREÂMBULO E OBJETIVOS</a>
                <p>O <span className="bold-text">SINGCONVERSE</span> é um projeto institucional da UFPR que visa a criação de um glossário terminológico em Língua Brasileira de Sinais (Libras). Seu objetivo central é catalogar, registrar e difundir sinais-termo técnicos e científicos, servindo como fonte de consulta gratuita para estudantes, pesquisadores, profissionais e a comunidade surda em geral. A participação comunitária é o pilar fundamental para a construção deste conhecimento coletivo e acessível.</p>
            </div>

            <div className="policy-subsection">
                <a id="3-o-signatario-declara-e-autoriza" href="#3-o-signatario-declara-e-autoriza" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 3. O SIGNATÁRIO DECLARA E AUTORIZA</a>
                <p>Ao submeter o conteúdo audiovisual à plataforma, o signatário, de forma <span className="bold-text">livre e consciente</span>, autoriza a Universidade Federal do Paraná a:</p>
                <ol>
                    <li>Utilizar sua imagem e voz contidas no vídeo para os fins específicos do projeto;</li>
                    <li>Publicar o conteúdo na plataforma digital SINGCONVERSE e em canais oficiais de comunicação da UFPR;</li>
                    <li>Utilizar o material para fins estritamente educacionais, de ensino, extensão e pesquisa científica;</li>
                    <li>Reproduzir, distribuir e exibir o conteúdo em eventos acadêmicos, congressos e seminários, sempre vinculando a autoria ao sinalizante.</li>
                </ol>
            </div>

            <div className="policy-subsection">
                <a id="4-direitos-e-responsabilidades" href="#4-direitos-e-responsabilidades" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 4. DIREITOS E RESPONSABILIDADES</a>
                <p>O signatário declara ser o detentor legítimo dos direitos autorais sobre o conteúdo submetido, garantindo que a obra não viola direitos de propriedade intelectual de terceiros. Por meio deste termo, concede-se à UFPR uma licença <span className="bold-text">não exclusiva, gratuita e por tempo indeterminado</span> para o uso do material. Esta autorização não implica na transferência dos direitos morais do autor, permanecendo a autoria intelectual vinculada ao sinalizante em todas as exibições.</p>
            </div>

            <div className="policy-subsection">
                <a id="5-conformidade-legal-e-privacidade" href="#5-conformidade-legal-e-privacidade" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 5. CONFORMIDADE LEGAL E PRIVACIDADE</a>
                <p>O tratamento de dados pessoais coletados neste formulário observa rigorosamente a <span className="bold-text">Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</span>. A utilização da imagem e dos direitos autorais respeita a <span className="bold-text">Lei nº 9.610/98</span> e as disposições do Código Civil Brasileiro. O signatário declara ser maior de idade ou possuir autorização expressa de seu responsável legal. É garantido ao participante o direito de revogação desta autorização a qualquer momento, mediante solicitação formal aos administradores do projeto, ciente de que o processamento da remoção do conteúdo ocorrerá em prazo administrativo razoável.</p>
            </div>

            <div className="policy-subsection">
                <a id="6-orientacoes-eticas-e-codigo-de-conduta" href="#6-orientacoes-eticas-e-codigo-de-conduta" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 6. ORIENTAÇÕES ÉTICAS E CÓDIGO DE CONDUTA</a>
                <p>O projeto <span className="bold-text">SINGCONVERSE</span> se compromete com os mais altos padrões <span className="bold-text">éticos e de inclusão</span>. Esperamos que todos os participantes respeitem as seguintes diretrizes ao submeter conteúdo:</p>

                <a id="61-linguagem-e-respeito" href="#61-linguagem-e-respeito" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 6.1 LINGUAGEM E RESPEITO</a>
                <p>O participante se compromete a:</p>
                <ul>
                    <li>Utilizar <span className="bold-text">linguagem apropriada, clara e respeitosa</span> em toda a sinalização do vídeo;</li>
                    <li><span className="bold-text">NÃO incluir </span> palavras de baixo calão, xingamentos, termos depreciativos ou linguagem abusiva;</li>
                    <li><span className="bold-text">NÃO usar sinais ou gestos</span> que contenham conteúdo ofensivo, discriminatório ou preconceituoso;</li>
                    <li>Manter <span className="bold-text">tom profissional e educacional</span> compatível com ambiente acadêmico;</li>
                    <li>Evitar referências derrogatórias a grupos sociais, étnicos, religiosos, de gênero ou qualquer minoria;</li>
                    <li>Garantir que o conteúdo seja apropriado para público diverso, incluindo crianças e adolescentes.</li>
                </ul>

                <a id="62-inclusao-e-respeito-a-comunidade-surda" href="#62-inclusao-e-respeito-a-comunidade-surda" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 6.2 INCLUSÃO E RESPEITO À COMUNIDADE SURDA</a>
                <p>O participante declara que:</p>
                <ul>
                    <li>Reconhece a <span className="bold-text">dignidade e igualdade</span> da comunidade surda e Deaf culture;</li>
                    <li>Compromete-se a <span className="bold-text">não perpetuar estereótipos negativos</span> sobre pessoas surdas;</li>
                    <li>Não utilizará sinais ou representações que <span className="bold-text">ridicularizem ou estigmatizem</span> a comunidade surda;</li>
                    <li>Respeitará as <span className="bold-text">variações regionais e dialetais</span> da Libras como formas legítimas de comunicação;</li>
                    <li>Contribui conscientemente para a <span className="bold-text">valorização e documentação adequada</span> da língua de sinais.</li>
                </ul>

                <a id="63-conteudo-proibido" href="#63-conteudo-proibido" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 6.3 CONTEÚDO PROIBIDO</a>
                <p>NÃO serão aceitos vídeos que contenham:</p>
                <ul>
                    <li>Linguagem xingamentosa, palavrões ou termos vulgares;</li>
                    <li><span className="bold-text">Discriminação ou preconceito </span>de qualquer natureza (raça, gênero, orientação sexual, religião, deficiência, etc.);</li>
                    <li>Apologia a violência, ódio ou comportamentos prejudiciais;</li>
                    <li>Conteúdo sexual explícito ou impróprio;</li>
                    <li><span className="bold-text">Violação de direitos autorais</span> ou propriedade intelectual de terceiros;</li>
                    <li>Difamação ou calúnia contra pessoas ou instituições;</li>
                    <li>Incitação ao ódio, bullying ou cyberbullying;</li>
                    <li><span className="bold-text">Desinformação deliberada</span> ou conteúdo enganoso;</li>
                    <li>Qualquer forma de assédio ou coerção.</li>
                </ul>

                <a id="64-qualidade-e-veracidade" href="#64-qualidade-e-veracidade" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 6.4 QUALIDADE E VERACIDADE</a>
                <p>O participante garante que:</p>
                <ul>
                    <li>O vídeo contém <span className="bold-text">informação precisa e confiável</span> sobre o sinal-termo;</li>
                    <li>A sinalização é <span className="bold-text">clara, visível e tecnicamente adequada</span> conforme orientações de gravação;</li>
                    <li>Não há edição enganosa ou distorção do significado original do sinal;</li>
                    <li>O conteúdo foi <span className="bold-text">gravado especificamente para este projeto </span> (não é material reutilizado sem autorização).</li>
                </ul>

                <a id="65-responsabilidade-social" href="#65-responsabilidade-social" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 6.5 RESPONSABILIDADE SOCIAL</a>
                <p>O participante reconhece que:</p>
                <ul>
                    <li>Sua contribuição faz parte de um <span className="bold-text">acervo educacional público e acessível;</span></li>
                    <li>O vídeo será visto por estudantes, pesquisadores e pessoas de todas as idades da comunidade surda e ouvinte;</li>
                    <li>A <span className="bold-text">qualidade ética e linguística</span> do material reflete positiva ou negativamente no projeto;</li>
                    <li>É um <span className="bold-text">privilégio</span> contribuir para recursos educacionais que fortalecem a Libras e a comunidade surda;</li>
                    <li>A <span className="bold-text">violação destas diretrizes </span> pode resultar na rejeição, remoção ou bloqueio de futuras submissões.</li>
                </ul>

                <a id="66-processo-de-validacao" href="#66-processo-de-validacao" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 6.6 PROCESSO DE VALIDAÇÃO</a>
                <p>A <span className="bold-text">UFPR</span> se reserva o direito de:</p>
                <ul>
                    <li><span className="bold-text">Revisar todo conteúdo</span> submetido quanto à conformidade com estas diretrizes;</li>
                    <li>Solicitar esclarecimentos ou reformulações de conteúdo questionável;</li>
                    <li><span className="bold-text">Rejeitar vídeos</span> que violem este código de conduta;</li>
                    <li><span className="bold-text">Remover conteúdo </span> já publicado caso seja identificada violação após submissão;</li>
                    <li>Comunicar ao participante os motivos de qualquer rejeição ou remoção.</li>
                </ul>

                <a id="67-duvidas-e-orientacoes" href="#67-duvidas-e-orientacoes" className="heading-anchor-wrapper a-heading"><span className="heading-anchor">#</span> 6.7 DÚVIDAS E ORIENTAÇÕES</a>
                <p>Os participantes podem:</p>
                <ul>
                    <li>Enviar dúvidas sobre o que é ou não permitido antes de submeter;</li>
                    <li>Solicitar orientação sobre <span className="bold-text">qualidade técnica </span>da sinalização;</li>
                    <li>Pedir feedback sobre o conteúdo antes da publicação final;</li>
                    <li>Contactar: <span className="bold-text">singconverse@ufpr.br</span> com assunto <span className="bold-text">'Orientações Éticas'</span>.</li>
                </ul>
                <p>Esta seção não é uma restrição, mas um compromisso compartilhado com a excelência acadêmica, o respeito mútuo e a valorização autêntica da Libras e da comunidade surda brasileira.</p>
            </div>

            <div className="policy-subsection">
                <a id="7-carater-voluntario-e-sem-ressarcimento" href="#7-carater-voluntario-e-sem-ressarcimento" className="heading-anchor-wrapper a-heading a-heading"><span className="heading-anchor">#</span> 7. CARÁTER VOLUNTÁRIO E SEM RESSARCIMENTO</a>
                <p><span className="bold-text">ATENÇÃO:</span> A submissão de vídeos ao projeto SINGCONVERSE é realizada de forma <span className="bold-text">totalmente voluntária, consciente e espontânea</span>. O signatário declara estar ciente de que <span className="bold-text">NÃO haverá qualquer tipo de ressarcimento financeiro</span>, pagamento de cachê, remuneração por direitos autorais ou compensação pecuniária de qualquer natureza pela participação ou pelo uso da imagem. A colaboração possui caráter estritamente altruístico e acadêmico, implicando na <span className="bold-text">renúncia expressa</span> a quaisquer valores monetários presentes ou futuros, mesmo que o material venha a ser utilizado em publicações que gerem receita para a instituição ou seus parceiros.</p>
            </div>

            <div className="policy-subsection">
                <a id="8-dados-pessoais-do-participante" href="#8-dados-pessoais-do-participante" className="heading-anchor-wrapper a-heading a-heading"><span className="heading-anchor">#</span> 8. DADOS PESSOAIS DO PARTICIPANTE</a>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li><span className="bold-text">Nome Completo:</span> ________________________________________</li>
                    <li><span className="bold-text">CPF:</span> ________________________________________</li>
                    <li><span className="bold-text">E-mail:</span> ________________________________________</li>
                    <li><span className="bold-text">Telefone:</span> ________________________________________</li>
                    <li><span className="bold-text">Cidade/Estado:</span> ________________________________________</li>
                </ul>
            </div>

            <div className="policy-subsection">
                <a id="9-informacoes-do-video-submetido" href="#9-informacoes-do-video-submetido" className="heading-anchor-wrapper a-heading a-heading"><span className="heading-anchor">#</span> 9. INFORMAÇÕES DO VÍDEO SUBMETIDO</a>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li><span className="bold-text">Sinal-Termo/Conceito:</span> ________________________________________</li>
                    <li><span className="bold-text">Data da Gravação:</span> ________________________________________</li>
                    <li><span className="bold-text">Descrição Breve (opcional):</span> ________________________________________</li>
                </ul>
            </div>

            <div className="policy-subsection">
                <a id="10-declaracao-final-e-aceite" href="#10-declaracao-final-e-aceite" className="heading-anchor-wrapper a-heading a-heading"><span className="heading-anchor">#</span> 10. DECLARAÇÃO FINAL E ACEITE</a>
                <p>Por ser a expressão da minha vontade e estar de acordo com todas as condições acima descritas, firmo o presente termo para que produza seus efeitos legais, reafirmando o caráter <span className="bold-text">não remunerado</span> da minha contribuição.</p>

                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={acceptanceChecked}
                        disabled={acceptanceDisabled}
                        onChange={(e) => onAcceptanceChange?.(e.target.checked)}
                    />
                    <span className="bold-text">
                        Declaro que li, compreendi e concordo integralmente com este Termo de Autorização para Submissão de Vídeo-Sinal.
                    </span>
                </div>
                <br />
                <p>_______________________________________________________<br />Assinatura do Participante (ou Responsável Legal)</p>
                <p>Local e data: Curitiba, 29 de abril de 2026</p>
            </div>

            <div className="policy-subsection">
                <a id="11-informacoes-adicionais" href="#11-informacoes-adicionais" className="heading-anchor-wrapper a-heading a-heading"><span className="heading-anchor">#</span> 11. INFORMAÇÕES ADICIONAIS</a>
                <p>Este documento serve como base jurídica para a plataforma digital. Usuários já cadastrados no sistema SINGCONVERSE poderão realizar a validação simplificada através de aceite eletrônico (checkbox), cujos registros de timestamp e IP servirão como comprovante de anuência a este termo completo. Todos os dados são processados para fins exclusivos de gestão do glossário e comunicações acadêmicas relacionadas.</p>
            </div>

            <div className="policy-subsection"></div>
        </div>
    )
}

export default TermoVideoSinal;