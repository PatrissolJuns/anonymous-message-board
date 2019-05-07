/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const ThreadController = require('../controllers/threadController.js');
const ReplyController  = require('../controllers/ReplyController.js');

module.exports = function (app) {
  const ThreadControl = new ThreadController();
  const ReplyControl  = new ReplyController();
  
  app.route('/api/threads/:board')
  
  .post(function(req, res){
    // sends board, text, delete_password
    // db doc => _id, text, creted_on, bumped_on, reported, delete_password, replies
    ThreadControl.postThread(req.params.board, req.body.text, req.body.delete_password, function(err, response){
      if(err) return console.log('Controller err: '+err);
      
      res.redirect('/b/'+req.params.board);
    });
    
  })
  
  .get(function(req, res){
    ThreadControl.getThreads(req.params.board, (err, response) => {
      res.json(response);
    });
  })
  
  .delete(function(req, res){
    ThreadControl.delThread(req.params.board, req.body.thread_id, req.body.delete_password, (err, response) => {
      if(err) return res.send(err);
      res.send('success');
    });
  })
  
  .put(function(req, res){
    ThreadControl.reportThread(req.params.board, req.body.thread_id, (err, response) => {
      if(err) return res.send(err);
      res.send('success');
    });
  });
    
  app.route('/api/replies/:board')
  
  .post( (req, res) => {
    // send => board, thread_id, text, delete_password
    // db doc.replies => _id, text, created_on, delete_password, reported
    ReplyControl.postReply(req.body.board, req.body.thread_id, req.body.text, req.body.delete_password, (err, response) => {
      if(err) return console.log('Controller err: '+err);
      
      res.redirect(`/b/${req.body.board}/${req.body.thread_id}`);
    });
  })
  
  .get( (req, res) => {
    ReplyControl.getThread(req.params.board, req.query.thread_id, (err, response) => {
      res.json(response);
    });
  })
  
  .delete( (req, res) => {
    ReplyControl.delReply(req.params.board, 
                        req.body.thread_id, 
                        req.body.reply_id,
                        req.body.delete_password, 
                        (err, response) => {
      if(err) return res.send(err);
      res.send('success');
    });
  })
  
  .put( (req, res) => {
    ReplyControl.reportReply(req.params.board, req.body.thread_id, req.body.reply_id, (err, response) => {
      if(err) return res.send(err);
      res.send('success');
    });
  });

};
