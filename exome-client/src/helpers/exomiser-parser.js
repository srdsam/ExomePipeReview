export function parse(data) {
    let geneScores = data[0].data

    let genes = [];
    let raw = [];

    for (var i = 0; i < geneScores.length; i++){
        const gene = geneScores[i]
        const geneProfile = {
            name: gene.geneIdentifier.geneSymbol,
            variantScore: gene.variantScore,
            priorityScore: gene.priorityScore,
            combinedScore: gene.combinedScore,
            compatibleInheritanceModes: gene.compatibleInheritanceModes,
            variantEvaluations: gene.variantEvaluations,
            geneScores: gene.geneScores,
            HiPhive: gene.priorityResults.HIPHIVE_PRIORITY.phenotypeEvidence,
            OMIM: gene.priorityResults.OMIM_PRIORITY.associatedDiseases
        }

        const rawGene = gene

        genes.push(geneProfile)
        raw.push(rawGene)
    }

    return { genes, raw }
}