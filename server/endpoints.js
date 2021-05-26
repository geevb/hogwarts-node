export function setupEndpoints(application) {
    const app = application;

    // All skills not explicitly referenced in the 'skills' property can be
    // assumed to be 0.
    app.express.get('/students', (req, res) => {
        const students = [
            {
                id: 1,
                name: 'Tester',
                email: 'test@soraschools.com',
                house: 'Heqet',
                skills: [
                    { id: 3, level: 2 },
                    { id: 4, level: 3 },
                    { id: 6, level: 1 },
                ],
            },
            {
                id: 2,
                name: 'Ludwig Wittgenstein',
                email: 'inaflyjar@soraschools.com',
                house: 'Heqet',
                skills: [
                    { id: 3, level: 4 },
                    { id: 4, level: 1 },
                ],
            },
            {
                id: 3,
                name: 'Max Stirner',
                email: 'nothingtome@soraschools.com',
                house: 'Heqet',
                skills: [
                    { id: 1, level: 2 },
                    { id: 3, level: 3 },
                    { id: 6, level: 3 },
                ],
            }
        ];
        res.send(students);
    });
  
    app.express.get('/current-user-id', (req, res) => {
        const currentUserId = 1; // don't assume this will always be true
        res.send(currentUserId);
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