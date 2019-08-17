const FriendRequest = require("../models/friend-request");
const User = require("../models/user");

exports.get = function(request, response, next) {
	const { username } = request.params;
	if (!username)
		return next({ message: "Username key is required in params." });

	FriendRequest.find({ receiver: username }, function(error, requests) {
		if (error) return next(error);
		else
			response.json({
				success: true,
				data: requests
			});
	});
};

exports.postCheck = function(request, response, next) {
	const { sender, receiver } = request.body;
	if (!sender || !receiver)
		return next({
			message: "Usernames for seder/receiver users are required."
		});

	User.findOne({ username: sender, friends: receiver }, function(
		error,
		user
	) {
		if (error) return next(error);
		else if (user)
			response.json({
				success: true,
				data: { exists: true, friends: true }
			});
		else
			FriendRequest.findOne(
				{ sender: sender, receiver: receiver },
				function(error, request) {
					if (error) return next(error);
					else if (request)
						response.json({
							success: true,
							data: { exists: true, friends: false }
						});
					else
						response.json({
							success: true,
							data: { exists: false, friends: false }
						});
				}
			);
	});
};

exports.postAdd = function(request, response, next) {
	const { sender, receiver } = request.body;
	if (!sender || !receiver)
		return next({
			message: "Usernames for seder/receiver users are required."
		});

	User.findOne({ username: sender, friends: receiver }, function(
		error,
		user
	) {
		if (error) return next(error);
		else if (user)
			return next({ message: "You are already friends with this user." });
		else
			FriendRequest.findOne(
				{ sender: sender, receiver: receiver },
				function(error, request) {
					if (error) return next(error);
					else if (!request) {
						User.findOne({ username: receiver }, function(
							error,
							user
						) {
							if (error) return next(error);
							else if (!user)
								return next({
									message:
										"User with the username provided does not exits."
								});
							else {
								FriendRequest.create(
									{
										sender: sender,
										receiver: receiver
									},
									function(error) {
										if (error) return next(error);
										else
											response.json({
												success: true,
												message:
													"Friend request was sent successfully."
											});
									}
								);
							}
						});
					} else
						response.json({
							success: false,
							message: "You have already sent a friend request."
						});
				}
			);
	});
};

exports.postConfirm = function(request, response, next) {
	const { id } = request.body;
	if (!id)
		return next({
			message: "Id key is required in body."
		});

	FriendRequest.findById(id, function(error, request) {
		if (error) return next(error);
		else if (!request)
			return next({
				message: "Friend request with the id provided does not exist."
			});
		else {
			User.update(
				{ username: request.sender },
				{ $push: { friends: request.receiver } },
				function(error) {
					if (error) return next(error);
				}
			);
			User.update(
				{ username: request.receiver },
				{ $push: { friends: request.sender } },
				function(error) {
					if (error) return next(error);
					else {
						FriendRequest.deleteOne({ _id: id }, function(error) {
							if (error) return next(error);
							else
								response.json({
									success: true,
									message:
										request.sender +
										" was added as a friend."
								});
						});
					}
				}
			);
		}
	});
};

exports.delete = function(request, response, next) {
	const { id } = request.params;
	if (!id) return next({ message: "Id key is required in params." });

	FriendRequest.deleteOne({ _id: id }, function(error) {
		if (error) return next(error);
		else
			response.json({
				success: true,
				message: "Friend request was deleted successfully."
			});
	});
};
