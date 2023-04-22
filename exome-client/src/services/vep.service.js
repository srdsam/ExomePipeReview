const apiUrl = "http://grch37.rest.ensembl.org/vep/homo_sapiens/hgvs"

async function getPathogenicity(chromosome, hgsvG, accession) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const columns = "dbNSFP=CADD_raw,Polyphen2_HDIV_score,SIFT_score,MetaSVM_score,MetaLR_score,MetaSVM_pred,MetaLR_pred"

    return fetch(`${apiUrl}/${accession}:${hgsvG}/?${columns}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch((error) => {
            console.log(error)
        })
}

export const patho = {
    getPathogenicity
};