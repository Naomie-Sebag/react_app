const Pack =require('./models/PackagesModels')
const User =require('./models/SignUpModels')

var clusters = {
    groupOrders : function(req,res_of_func) {
        
         Pack.find({}, async (err, result) =>  {
            if (err) throw err;
            console.log(result);

            var size = JSON.stringify(req.body.KSize);
            let vectors = new Array();

            for (let i = 0 ; i < result.length ; i++) {
                vectors[i] = [ result[i]['longitude'] , result[i]['latitude']];
            }
            console.log(vectors);
            const kmeans = require('node-kmeans');
            var size_int = parseInt(size);

            kmeans.clusterize(vectors, {k: parseInt(size[1])}, (err,result) => {
                if (err)
                    return res_of_func.status(400).json({'status' : 'Error'});
                else {
                    var str_result = JSON.stringify(result);

                    console.log("clusterization succeeded: " + str_result)
                    
                    for(let i=0; i< result.length; i++) {
                        var str_result_long = JSON.stringify(result[i].cluster[0][0])
                        var str_result_lat = JSON.stringify(result[i].cluster[0][1])
                        Pack.findOne({longitude: str_result_long, latitude : str_result_lat}, async (err, res) =>  {
                            if (err) throw err;

                            console.log("package with the Address centroid found: " + res);
                            
                            User.findOne({city: res.address, isManager : false}, async (err, user_res) =>  {
                                if (err) throw err;
    
                                console.log("the username is: " + user_res.username);
                                var new_assignee = {$set : {AssignedTo: user_res.username}};
                                
                                var str_result_clusterInd = JSON.stringify(result[i].clusterInd);
                                
                                console.log("cluster index is: " + str_result_clusterInd)
                               

                                var str_result_clusterInd_length = ((str_result_clusterInd.length/2) - 2);

                                if((str_result_clusterInd_length % 10) !== 0)
                                   str_result_clusterInd_length += 1.5;
                                else
                                str_result_clusterInd_length += 1;

                                console.log("cluster index length is: " + str_result_clusterInd_length)


                                for(let j=0; j < str_result_clusterInd_length; j++)
                                {
                                    // console.log(JSON.stringify(result[j].cluster))
                                    var str_result_long_j = JSON.stringify(result[i].cluster[j][0])
                                    var str_result_lat_j = JSON.stringify(result[i].cluster[j][1])

                                    Pack.updateOne({longitude: str_result_long_j, latitude: str_result_lat_j}, new_assignee, async (err, update_res) =>  {
                                        if (err) throw err;//"already assigned to someone! wait for delivery or update the distributor";
                                        console.log("update success: " + update_res)
                                    })
                                }

                             } )

                        })
                    }

                    return res_of_func.status(200).json("clusterization successful ");
                }
           });

         })

         
        
   
    }
}

module.exports = clusters;