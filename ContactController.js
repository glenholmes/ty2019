/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// View to show all contacts
	index : function (req, res){
		Contact.find(function(error, contacts){
			if(error){
				return res.serverError(error);
			}

			res.view({
				contacts : contacts
			})
		})
	},

	// Action to create a contact
	create : function (req, res){
		Contact.create(req.params.all(), function(error, contact){
			if(error){
				return res.serverError(error);
			}

			res.redirect('/contact/show/'+contact.id);
		})
	},

	// View to show contact
	show : function (req, res){
		Contact.findOne(req.param('id'), function(error, contact){
			if(error){
				return res.serverError(error);
			}

			if(!contact){
				return res.notFound('Contact '+req.param('id')+' does not exist!');
			}

			res.view({
				contact : contact
			})
		})
	},

	// View to edit a contact
	edit : function (req, res){
		Contact.findOne(req.param('id'), function(error, contact){
			if(error){
				return res.serverError(error);
			}

			if(!contact){
				return res.notFound('Contact '+req.param('id')+' does not exist!');
			}

			res.view({
				contact : contact
			})
		})
	},

	// Action to update a contact
	update : function (req, res){
		console.log(req.params.all());
		Contact.update(req.param('id'), {bio : req.param('bio'), name : req.param('name'), phone : req.param('phone')}, function(error, contact){
			if(error){
				return res.serverError(error);
			}

			if(!contact){
				return res.notFound('Contact '+req.param('id')+' does not exist!');
			}

			res.redirect('/contact/show/'+req.param('id'));
		})
	},

	// Delete contact
	delete : function (req, res){
		Contact.destroy(req.param('id'), function(error, contact){
			if(error){
				return res.serverError(error);
			}

			if(!contact){
				return res.notFound('Contact '+req.param('id')+' does not exist!');
			}

			res.redirect('/contact/');

		})
	}

};

