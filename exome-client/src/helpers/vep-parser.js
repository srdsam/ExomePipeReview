export async function parseVEP(data) {

    let results = []
    let consequence = []

    if (data == undefined) {

        results.push("Fetch failed or rejected by http://grch37.rest.ensembl.org/vep/")

    } else if (data.error) {

        results.push(data.error)

    } else if (data[0]) {
        let scores = data[0].transcript_consequences
        consequence.push(data[0].most_severe_consequence)

        if (data[0].transcript_consequences) {
            for (var i = 0; i < scores.length; i++){
                let score = scores[i]
    
                const VEP = {
                    exists: true,
                    transcript_id: score.transcript_id,
                    metaSVM: score.metasvm_score,
                    metaSVM_prediction: score.metasvm_pred,
                    sift_score: score.sift_score,
                    sift_prediction: score.sift_prediction,
                    polyphen_score: score.polyphen_score,
                    polyphen_prediction: score.polyphen_prediction,
                    cadd_raw: score.cadd_raw,
                    polyphen2_hdiv_score: score.polyphen2_hdiv_score,
                    metalr_score: score.metalr_score,
                    metalr_prediction: score.metalr_pred,
                    most_severe_consequence: score.most_severe_consequence
    
                }
    
                results.push(VEP)
            }
        } else {

            results.push("No variant pathogenecity scores/transcript consequences")
        }

    } else {
        const VEP = {
            exists: false
        }
        results.push(VEP)
    }

    console.log(consequence)

    return { results, consequence }
}