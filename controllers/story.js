const Story = require("../models/story");

exports.view_all = function(req,res){
	Story.find().then(result=>{
		res.send(result);
	}).catch(err=>{
		res.send(err);
	})
}
exports.view_by_id = function(req,res){
	Story.findById({_id: req.params.storyId}).then(result=>{
		res.json(result);
	}).catch(err=>{
		res.json(err);
	})
}


exports.add_story = function(req,res){
	let story = new Story({
        userId : req.user._id,
		text: req.body.text,
		image: './'+ req.file.path
	})
	story.save().then(result=>{
		res.send(result);
	}).catch(err=>{
		res.send(err);
	})
}
exports.delete_story = function(req,res){
	const id = req.params.id;
  const story = Story.findOne({_id:id});
  if(story){
  	if(story.userId=req.user._id){
  		Story.remove({_id:id}).then(result=>{
  			res.json(result);
  		}).catch(err=>{
  			res.send(err);
  		})
  	}
  }
  else{
  	res.send("permission denied");
  }
}
exports.delete_all = function(req,res){
	Story.remove({}).then(result=>{
		res.send("database is empty");
	}).catch(err=>{
		res.send("forbidden")
	})
}