import { chooseStudentsHelperForSkill } from './control';
import { Request, Response } from 'express';
import { Application } from 'app';

export function setupEndpoints(application: Application) {
    const app = application;

    app.express.get('/students', async (_req: Request, res: Response) => {
        const studentId = 3;
        const skillId = 2;
        return res.send(await chooseStudentsHelperForSkill(app.dbProvider, studentId, skillId));
    });
    
    app.express.get('/faculty', (_req: Request, res: Response) => {
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
  
    app.express.get('/skills', (_req: Request, res: Response) => {
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