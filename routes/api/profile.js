const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profiles');
const User = require('../../models/User');

const { check, validationResult } = require('express-validator');


//@route GET api/profile/me

// @desc Get current users profile


//@access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route POST api/profile
// @desc Create or update user profile
//@access Private

router.post('/', [auth, [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { company, website, location, bio, status, githubusername, skills } = req.body;
    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());

    }

    //Build social object
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // Initialize empty arrays for experience and education if creating new profile
    profileFields.experience = [];
    profileFields.education = [];

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            //update existing profile
            profile.company = company || profile.company;
            profile.website = website || profile.website;
            profile.location = location || profile.location;
            profile.bio = bio || profile.bio;
            profile.status = status || profile.status;
            profile.githubusername = githubusername || profile.githubusername;
            if (skills) profile.skills = skills.split(',').map(skill => skill.trim());

            profile.social = profile.social || {};
            if (req.body.youtube) profile.social.youtube = req.body.youtube;
            if (req.body.twitter) profile.social.twitter = req.body.twitter;
            if (req.body.facebook) profile.social.facebook = req.body.facebook;
            if (req.body.linkedin) profile.social.linkedin = req.body.linkedin;
            if (req.body.instagram) profile.social.instagram = req.body.instagram;

            // ensure arrays exist
            if (!profile.experience) profile.experience = [];
            if (!profile.education) profile.education = [];

            await profile.save();
            return res.json(profile);
        }

        //create new profile with all fields including arrays
        profileFields.experience = [];
        profileFields.education = [];
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route GET api/profile
// @desc Get all profiles
//@access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route GET api/profile/user/:user_id
// @desc Get profile by user ID
//@access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: 'Profile not found' });
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile
// @desc Delete profiles
//@access Private
router.delete('/', auth, async (req, res) => {
    try {
        //Remove profile 
        await Profile.findOneAndDelete({ user: req.user.id });
        //Remove user
        await User.findByIdAndDelete(req.user.id);
        res.json({ msg: 'User deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route PUT api/profile/experience
// @desc Add experience to profile
//@access Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;

    const experience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        // use findOneAndUpdate with $push - this will create experience array if it doesn't exist
        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $push: { experience: { $each: [experience], $position: 0 } } },
            { new: true }
        );

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
//@access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        if (removeIndex === -1) {
            return res.status(400).json({ msg: 'Experience not found' });
        }
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route PUT api/profile/education
// @desc Add education to profile
//@access Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route DELETE api/profile/education/:edu_id
// @desc Delete education from profile
//@access Private

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;