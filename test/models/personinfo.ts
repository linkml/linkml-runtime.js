

export type NamedThingId = string

export type PersonId = string

export type OrganizationId = string

export type PlaceId = string

export type ConceptId = string

export type DiagnosisConceptId = string

export type ProcedureConceptId = string




/**
 * A generic grouping for any identifiable entity
 */

export interface NamedThing  {
    
    
    /**
     * None
     */
    id?: string,
    
    
    /**
     * None
     */
    name?: string,
    
    
    /**
     * None
     */
    description?: string,
    
    
    /**
     * None
     */
    image?: string,
    
}


/**
 * A person (alive, dead, undead, or fictional).
 */

export interface Person  extends NamedThing, HasAliases  {
    
    
    /**
     * None
     */
    primary_email?: string,
    
    
    /**
     * None
     */
    birth_date?: string,
    
    
    /**
     * None
     */
    age_in_years?: number,
    
    
    /**
     * None
     */
    gender?: string,
    
    
    /**
     * The address at which a person currently lives
     */
    current_address?: Address,
    
    
    /**
     * None
     */
    has_employment_history?: EmploymentEvent[],
    
    
    /**
     * None
     */
    has_familial_relationships?: FamilialRelationship[],
    
    
    /**
     * None
     */
    has_medical_history?: MedicalEvent[],
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    id?: string,
    
    
    /**
     * None
     */
    name?: string,
    
    
    /**
     * None
     */
    description?: string,
    
    
    /**
     * None
     */
    image?: string,
    
}


/**
 * A mixin applied to any class that can have aliases/alternateNames
 */

export interface HasAliases  {
    
    
    /**
     * None
     */
    aliases?: string,
    
}


/**
 * An organization such as a company or university
 */

export interface Organization  extends NamedThing, HasAliases  {
    
    
    /**
     * None
     */
    mission_statement?: string,
    
    
    /**
     * None
     */
    founding_date?: string,
    
    
    /**
     * None
     */
    founding_location?: PlaceId,
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    id?: string,
    
    
    /**
     * None
     */
    name?: string,
    
    
    /**
     * None
     */
    description?: string,
    
    
    /**
     * None
     */
    image?: string,
    
}


/**
 * None
 */

export interface Place  extends HasAliases  {
    
    
    /**
     * None
     */
    id?: string,
    
    
    /**
     * None
     */
    name?: string,
    
    
    /**
     * None
     */
    aliases?: string,
    
}


/**
 * None
 */

export interface Address  {
    
    
    /**
     * None
     */
    street?: string,
    
    
    /**
     * None
     */
    city?: string,
    
    
    /**
     * None
     */
    postal_code?: string,
    
}


/**
 * None
 */

export interface Event  {
    
    
    /**
     * None
     */
    started_at_time?: date,
    
    
    /**
     * None
     */
    ended_at_time?: date,
    
    
    /**
     * None
     */
    duration?: number,
    
    
    /**
     * None
     */
    is_current?: boolean,
    
}


/**
 * None
 */

export interface Concept  extends NamedThing  {
    
    
    /**
     * None
     */
    id?: string,
    
    
    /**
     * None
     */
    name?: string,
    
    
    /**
     * None
     */
    description?: string,
    
    
    /**
     * None
     */
    image?: string,
    
}


/**
 * None
 */

export interface DiagnosisConcept  extends Concept  {
    
    
    /**
     * None
     */
    id?: string,
    
    
    /**
     * None
     */
    name?: string,
    
    
    /**
     * None
     */
    description?: string,
    
    
    /**
     * None
     */
    image?: string,
    
}


/**
 * None
 */

export interface ProcedureConcept  extends Concept  {
    
    
    /**
     * None
     */
    id?: string,
    
    
    /**
     * None
     */
    name?: string,
    
    
    /**
     * None
     */
    description?: string,
    
    
    /**
     * None
     */
    image?: string,
    
}


/**
 * None
 */

export interface Relationship  {
    
    
    /**
     * None
     */
    started_at_time?: date,
    
    
    /**
     * None
     */
    ended_at_time?: date,
    
    
    /**
     * None
     */
    related_to?: string,
    
    
    /**
     * None
     */
    type?: string,
    
}


/**
 * None
 */

export interface FamilialRelationship  extends Relationship  {
    
    
    /**
     * None
     */
    started_at_time?: date,
    
    
    /**
     * None
     */
    ended_at_time?: date,
    
    
    /**
     * None
     */
    related_to?: string,
    
    
    /**
     * None
     */
    type?: string,
    
}


/**
 * None
 */

export interface EmploymentEvent  extends Event  {
    
    
    /**
     * None
     */
    employed_at?: OrganizationId,
    
    
    /**
     * None
     */
    started_at_time?: date,
    
    
    /**
     * None
     */
    ended_at_time?: date,
    
    
    /**
     * None
     */
    duration?: number,
    
    
    /**
     * None
     */
    is_current?: boolean,
    
}


/**
 * None
 */

export interface MedicalEvent  extends Event  {
    
    
    /**
     * None
     */
    in_location?: PlaceId,
    
    
    /**
     * None
     */
    diagnosis?: DiagnosisConcept,
    
    
    /**
     * None
     */
    procedure?: ProcedureConcept,
    
    
    /**
     * None
     */
    started_at_time?: date,
    
    
    /**
     * None
     */
    ended_at_time?: date,
    
    
    /**
     * None
     */
    duration?: number,
    
    
    /**
     * None
     */
    is_current?: boolean,
    
}


/**
 * None
 */

export interface WithLocation  {
    
    
    /**
     * None
     */
    in_location?: PlaceId,
    
}


/**
 * None
 */

export interface Container  {
    
    
    /**
     * None
     */
    persons?: Person[],
    
    
    /**
     * None
     */
    organizations?: Organization[],
    
}

