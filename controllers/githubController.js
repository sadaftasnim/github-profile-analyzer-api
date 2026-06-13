const db = require("../config/db");
const { getGithubProfile } = require("../services/githubService");


const analyzeProfile = async (req, res) => {

    try {

        const username = req.params.username;

        const profile = await getGithubProfile(username);

        const accountAgeYears =
            new Date().getFullYear() -
            new Date(profile.created_at).getFullYear();

        const sql = `
            INSERT INTO github_profiles
            (
                username,
                name,
                bio,
                location,
                followers,
                following,
                public_repos,
                public_gists,
                account_age_years,
                profile_url,
                avatar_url
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

            ON DUPLICATE KEY UPDATE

            name = VALUES(name),
            bio = VALUES(bio),
            location = VALUES(location),
            followers = VALUES(followers),
            following = VALUES(following),
            public_repos = VALUES(public_repos),
            public_gists = VALUES(public_gists),
            account_age_years = VALUES(account_age_years),
            profile_url = VALUES(profile_url),
            avatar_url = VALUES(avatar_url)
        `;

        db.query(
            sql,
            [
                profile.login,
                profile.name,
                profile.bio,
                profile.location,
                profile.followers,
                profile.following,
                profile.public_repos,
                profile.public_gists,
                accountAgeYears,
                profile.html_url,
                profile.avatar_url
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "Profile analyzed and saved successfully",
                    username: profile.login,
                    data: {
                        followers: profile.followers,
                        following: profile.following,
                        publicRepos: profile.public_repos,
                        publicGists: profile.public_gists,
                        accountAgeYears: accountAgeYears
                    }
                });
            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getAllProfiles = (req, res) => {

    const sql = "SELECT * FROM github_profiles";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    });
};


const getProfileByUsername = (req, res) => {

    const username = req.params.username;

    const sql =
        "SELECT * FROM github_profiles WHERE username = ?";

    db.query(sql, [username], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result[0]
        });
    });
};

module.exports = {
    analyzeProfile,
    getAllProfiles,
    getProfileByUsername
};