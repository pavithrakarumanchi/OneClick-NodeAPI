exports.createPostValidator=(req,res,next)=>{
	// Validation for title
	req.check('title',"Write a title").notEmpty()
	req.check('title',"Title must be between 4 to 150 characters").isLength({
		min: 4,
		max: 150
	});

	// Validation for body
	req.check('title',"Write a body").notEmpty()
	req.check('title',"Body must be between 4 to 2000 characters").isLength({
		min: 4,
		max: 2000
	});

	// Check for all errors
	const errors=req.validationErrors() // We will get all request validation errors

	// If error show the first one as they happen
	if(errors){
		const firstError=errors.map((error)=> error.msg)[0]
		return res.status(400).json({error:firstError})
	}

	//Proceed to next middleware
	next();
};

exports.userSignupValidator = (req,res,next) => {
	//Name is not null and between 4-20 characters
	req.check("name","Name is required").notEmpty();
	req.check("name","Name must be between 4 to 20 characters").isLength({
		min: 4,
		max: 20
	});
	//Email is not null, valid and normalized
	req.check("email","Email must be between 3 to 32 characters")
	.matches(/.+\@.+\..+/)
	.withMessage("Email must contain @")
	.isLength({
		min: 4,
		max: 2000
	})
    // check for password
    req.check("password","Password is required").notEmpty();
    req.check('password')
    .isLength({min: 6})
    .withMessage("Password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    //Check for errors
    const errors=req.validationErrors() // We will get all request validation errors

	// If error show the first one as they happen
	if(errors){
		const firstError=errors.map((error)=> error.msg)[0]
		return res.status(400).json({error:firstError})
	}

	//Proceed to next middleware
	next();
}


exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");
 
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};


