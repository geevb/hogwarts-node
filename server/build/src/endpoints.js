"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEndpoints = void 0;
const control_js_1 = require("./control.js");
function setupEndpoints(application) {
    const app = application;
    app.express.get('/students', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const studentId = 3;
        const skillId = 2;
        return res.send(yield control_js_1.chooseStudentsHelperForSkill(app.dbProvider, studentId, skillId));
    }));
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
exports.setupEndpoints = setupEndpoints;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEQ7QUFJNUQsU0FBZ0IsY0FBYyxDQUFDLFdBQXdCO0lBQ25ELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQztJQUV4QixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7UUFDL0QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNsQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSx5Q0FBNEIsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7UUFDeEQsTUFBTSxPQUFPLEdBQUc7WUFDWjtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QjtTQUNKLENBQUM7UUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO1FBQ3ZELE1BQU0sTUFBTSxHQUFHO1lBQ1g7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFVBQVUsRUFBRSxDQUFDO2FBQ2hCO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkIsVUFBVSxFQUFFLENBQUM7YUFDaEI7WUFDRDtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsVUFBVSxFQUFFLENBQUM7YUFDaEI7U0FDSixDQUFDO1FBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU07SUFDTiwwQ0FBMEM7SUFDMUMsTUFBTTtJQUNOLHFEQUFxRDtJQUNyRCxtQkFBbUI7SUFDbkIsa0NBQWtDO0lBQ2xDLDRDQUE0QztJQUM1QyxtQ0FBbUM7SUFDbkMsZ0JBQWdCO0lBQ2hCLDRFQUE0RTtJQUM1RSwrREFBK0Q7SUFDL0Qsa0NBQWtDO0lBQ2xDLHdCQUF3QjtJQUN4QixzQ0FBc0M7SUFDdEMsdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixTQUFTO0lBQ1QsS0FBSztJQUVMLG9CQUFvQjtJQUNwQixrQ0FBa0M7SUFDbEMsMkNBQTJDO0lBQzNDLDZDQUE2QztJQUM3QyxrQ0FBa0M7SUFDbEMsZ0JBQWdCO0lBQ2hCLHdDQUF3QztJQUN4QyxzQkFBc0I7SUFDdEIsZ0RBQWdEO0lBQ2hELDJCQUEyQjtJQUUzQixzREFBc0Q7SUFDdEQsNkRBQTZEO0lBQzdELDJHQUEyRztJQUMzRyxnR0FBZ0c7SUFDaEcsK0VBQStFO0lBQy9FLGdCQUFnQjtJQUVoQiw0RUFBNEU7SUFDNUUsdUVBQXVFO0lBQ3ZFLGtDQUFrQztJQUNsQyx3QkFBd0I7SUFDeEIsc0NBQXNDO0lBQ3RDLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osU0FBUztJQUNULEtBQUs7SUFFTCxzQkFBc0I7SUFDdEIsa0RBQWtEO0lBQ2xELDJDQUEyQztJQUMzQywyQ0FBMkM7SUFDM0Msa0NBQWtDO0lBQ2xDLGdCQUFnQjtJQUNoQixzREFBc0Q7SUFDdEQsNkRBQTZEO0lBQzdELGdEQUFnRDtJQUNoRCx1RUFBdUU7SUFDdkUsNkRBQTZEO0lBQzdELGdCQUFnQjtJQUNoQiw0RUFBNEU7SUFDNUUsMkVBQTJFO0lBQzNFLHFDQUFxQztJQUNyQyx1RUFBdUU7SUFDdkUsZ0JBQWdCO0lBQ2hCLHFHQUFxRztJQUNyRyx3QkFBd0I7SUFDeEIsc0NBQXNDO0lBQ3RDLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osU0FBUztJQUNULEtBQUs7QUFDVCxDQUFDO0FBckhELHdDQXFIQyJ9