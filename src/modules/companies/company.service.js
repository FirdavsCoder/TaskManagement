import {ResData} from "../../common/resData.js";
import {CompanyRepository} from "./company.repository.js";
import {CompanyEntity} from "./entity/entity.js";
import {CompanyNotFound} from "./exception/company.exception.js";


export class CompanyService {
	#repository;
	constructor() {
		this.#repository = new CompanyRepository()
	}

	async insert(dto) {
		const newCompany = new CompanyEntity(dto)
		const newAddedCompany = await this.#repository.insert(newCompany)
		console.log(newAddedCompany)
		return new ResData(
			"Successfully added",
			201,
			newAddedCompany
		)
	};

	async getAll() {
		const allCompanies = await this.#repository.getAll();
		return new ResData(
			"All Companies",
			201,
			allCompanies
		)
	};

	async getById(id) {
		const foundCompany = await this.#repository.getById(id);
		if (!foundCompany) {
			throw new CompanyNotFound()
		}

		return new ResData(
			"Successfully found",
			200,
			foundCompany
		)
	}

	async update(id, dto) {
		await this.getById(id);

		const updateCompany = new CompanyEntity(dto)
		updateCompany.id = id
		const updatedCompany = await this.#repository.update(updateCompany);
		return new ResData(
			"Successfully updated",
			200,
			updatedCompany
		)
	};

	async delete(id) {
		await this.getById(id);
		const deletedBrand = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedBrand
		)
	};
}