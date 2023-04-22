
const apiUrl = "https://clinicaltables.nlm.nih.gov/api/variants/v4/search"

function getClinVar(gene) {
    const requestOptions = {
        method: 'GET',
    };

    const fields = "AminoAcidChange,Chromosome,GeneSymbol,PhenotypeList,NucleotideChange,Type"
    const terms = gene

    return fetch(`${apiUrl}?terms=${terms}&df=${fields}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
}

export const clinvar = {
    getClinVar
};