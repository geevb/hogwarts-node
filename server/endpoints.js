export function setupEndpoints(application) {
    const app = application;

    app.express.get('/students', async (req, res) => {
        const studentId = req.studentId || 3;
        const skillId = req.skillId || 2;
        const studentsWithSelectedSkillId = await app.dbProvider.db.any(`
            SELECT students.id, students.name, students.house, student_skills.skill_id, student_skills.level
            FROM students
            JOIN student_skills
            ON students.id = student_skills.student_id
            WHERE skill_id = ${skillId};
        `);

        console.log({studentsWithSelectedSkillId})

        if (!studentsWithSelectedSkillId || studentsWithSelectedSkillId.length === 1) { // Only the loggedInStudent has the selected skill
            return res.send({ FACULTY: TRUE });
            // return res.send(getFacultyWithSkill(skillId));
        }

        const loggedInStudentData = studentsWithSelectedSkillId.find(studentDataAndSkills => { 
            return studentDataAndSkills.id === studentId;
        });

        console.log({loggedInStudentData})

        const loggedInStudentHouse = loggedInStudentData.house;
        const loggedInStudentLevelInSelectedSkill = loggedInStudentData.level;

        const capableStudents = studentsWithSelectedSkillId
            .filter(student => {
                return student.id !== studentId && student.level > loggedInStudentLevelInSelectedSkill; 
            })
            .sort((a, b) => {
                /*
                Sort logic: 

                Sort by level in the specific skill;
                If skill level is the same, sort by the students house. Students with the same house as the loggedInStudent
                should be prioritized.
                */

                const levelSort = b.level - a.level; // Sort level descending
                if (levelSort) return levelSort;

                const aHouseEqualsStudentHouse = a.house === loggedInStudentHouse;
                const bHouseEqualsStudentHouse = b.house === loggedInStudentHouse;
                if (aHouseEqualsStudentHouse === bHouseEqualsStudentHouse) { // Both have (or don't) the loggedInStudent's house
                    return 0;
                }

                if (aHouseEqualsStudentHouse) return -1;
                if (bHouseEqualsStudentHouse) return 1;
            });
            
        if (capableStudents.length) {
            return res.send(capableStudents[0]);
        }

        return res.send({ FACULTY: TRUE });
    });
    
    app.express.get('/faculty', (req, res) => {
        const faculty = [
            {
                id: 1,
                name: 'Michael Granado',
                subject_ids: [3, 4],
            },
            {
                id: 2,
                name: 'Carolyn Reeves',
                subject_ids: [1, 2],
            },
        ];
        res.send(faculty);
    });
  
    app.express.get('/skills', (req, res) => {
        const skills = [
            {
                id: 1,
                title: 'Algebra Skill',
                subject_id: 1,
            },
            {
                id: 2,
                title: 'Geometry skill',
                subject_id: 1,
            },
            {
                id: 3,
                title: 'Biology Skill',
                subject_id: 2,
            }
        ];
        res.send(skills);
    });

    // /**
    //  * Furnace Maintenance Window endpoints
    //  */
    // const maintenanceWindowRoutePath = '/maintenance';
    // app.express.get(
    //     maintenanceWindowRoutePath,
    //     rateLimiter(500, 10, logRateLimiter),
    //     async (_req, res, next) => {
    //         try {
    //             const maintenanceDB = getMaintenanceWindowDB(app.dbProvider);
    //             const response = await maintenanceDB.queryAll();
    //             res.json(response);
    //         } catch (e) {
    //             logAssets.exception(e);
    //             next(e);
    //         }
    //     },
    // );

    // app.express.post(
    //     maintenanceWindowRoutePath,
    //     rateLimiter(50, 10, logRateLimiter),
    //     celebrate(postFurnaceMaintenanceData),
    //     async (req, res, next) => {
    //         try {
    //             const request = req.body;
    //             const {
    //                 period: { fromTick, toTick },
    //             } = request;

    //             const plantId = config.get('plant.id');
    //             const { plant } = await getAssetsRaw(plantId);
    //             const maintenanceMaxPeriodInDays = getConstant(plant.parameters.maintenanceMaxPeriodInDays);
    //             if (moment(toTick).diff(moment(fromTick), 'days') > maintenanceMaxPeriodInDays) {
    //                 throw new PeriodBadRequestError(maintenanceMaxPeriodInDays);
    //             }

    //             const maintenanceDB = getMaintenanceWindowDB(app.dbProvider);
    //             const response = await maintenanceDB.upsertOne(request);
    //             res.json(response);
    //         } catch (e) {
    //             logAssets.exception(e);
    //             next(e);
    //         }
    //     },
    // );

    // app.express.delete(
    //     `${maintenanceWindowRoutePath}/:furnaceId`,
    //     rateLimiter(50, 10, logRateLimiter),
    //     celebrate(deleteFurnaceMaintenance),
    //     async (req, res, next) => {
    //         try {
    //             const plantId = config.get('plant.id');
    //             const rawAssets = await getAssetsRaw(plantId);
    //             const { furnaceId } = req.params;
    //             if (!rawAssets.furnaces.find(f => f.id === furnaceId)) {
    //                 throw new FurnaceNotFoundError(furnaceId);
    //             }
    //             const maintenanceDB = getMaintenanceWindowDB(app.dbProvider);
    //             const numDeleted = await maintenanceDB.deleteOne(furnaceId);
    //             if (numDeleted <= 0) {
    //                 throw new MaintenanceWindowNotFoundError(furnaceId);
    //             }
    //             res.json({ message: `Maintenance window for furnace ${furnaceId} has been deleted` });
    //         } catch (e) {
    //             logAssets.exception(e);
    //             next(e);
    //         }
    //     },
    // );
}