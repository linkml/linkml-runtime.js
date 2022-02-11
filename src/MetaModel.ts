

export type ElementName = string

export type SchemaDefinitionName = string

export type TypeDefinitionName = string

export type SubsetDefinitionName = string

export type DefinitionName = string

export type EnumDefinitionName = string

export type SlotDefinitionName = string

export type ClassDefinitionName = string

export type SettingSettingKey = string

export type PrefixPrefixPrefix = string

export type LocalNameLocalNameSource = string

export type AltDescriptionAltDescriptionSource = string

export type PermissibleValueText = string

export type UniqueKeyUniqueKeyName = string

export type AnnotationExtensionTag = string

export type ExtensionExtensionTag = string




/**
 * Generic metadata shared across definitions
 */

export interface CommonMetadata  {
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * a named element in the model
 */

export interface Element  extends Extensible, Annotatable, CommonMetadata  {
    
    
    /**
     * the unique name of the element within the context of the schema.  Name is combined with the default prefix to form the globally unique subject of the target class.
     */
    name?: string,
    
    
    /**
     * the identifier of this class or slot must begin with the URIs referenced by this prefix
     */
    id_prefixes?: string,
    
    
    /**
     * the "native" URI of the element
     */
    definition_uri?: string,
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    local_names?: {[index: LocalNameLocalNameSource]: LocalName },
    
    
    /**
     * An established standard to which the element conforms.
     */
    conforms_to?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have comparable meaning. These may include terms that are precisely equivalent, broader or narrower in meaning, or otherwise semantically related but not equivalent from a strict ontological perspective.
     */
    mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have identical meaning.
     */
    exact_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have close meaning.
     */
    close_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have related meaning.
     */
    related_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have narrower meaning.
     */
    narrow_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have broader meaning.
     */
    broad_mappings?: string,
    
    
    /**
     * the relative order in which the element occurs, lower values are given precedence
     */
    rank?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * a collection of subset, type, slot and class definitions
 */

export interface SchemaDefinition  extends Element  {
    
    
    /**
     * The official schema URI
     */
    id?: string,
    
    
    /**
     * particular version of schema
     */
    version?: string,
    
    
    /**
     * other schemas that are included in this schema
     */
    imports?: string,
    
    
    /**
     * license for the schema
     */
    license?: string,
    
    
    /**
     * prefix / URI definitions to be added to the context beyond those fetched from prefixcommons in id prefixes
     */
    prefixes?: {[index: PrefixPrefixPrefix]: Prefix },
    
    
    /**
     * a list of Curie prefixes that are used in the representation of instances of the model.  All prefixes in this list are added to the prefix sections of the target models.
     */
    emit_prefixes?: string,
    
    
    /**
     * ordered list of prefixcommon biocontexts to be fetched to resolve id prefixes and inline prefix variables
     */
    default_curi_maps?: string,
    
    
    /**
     * default and base prefix -- used for ':' identifiers, @base and @vocab
     */
    default_prefix?: string,
    
    
    /**
     * default slot range to be used if range element is omitted from a slot definition
     */
    default_range?: TypeDefinitionName,
    
    
    /**
     * list of subsets referenced in this model
     */
    subsets?: {[index: SubsetDefinitionName]: SubsetDefinition },
    
    
    /**
     * data types used in the model
     */
    types?: {[index: TypeDefinitionName]: TypeDefinition },
    
    
    /**
     * enumerated ranges
     */
    enums?: {[index: EnumDefinitionName]: EnumDefinition },
    
    
    /**
     * slot definitions
     */
    slots?: {[index: SlotDefinitionName]: SlotDefinition },
    
    
    /**
     * class definitions
     */
    classes?: {[index: ClassDefinitionName]: ClassDefinition },
    
    
    /**
     * Version of the metamodel used to load the schema
     */
    metamodel_version?: string,
    
    
    /**
     * name, uri or description of the source of the schema
     */
    source_file?: string,
    
    
    /**
     * modification date of the source of the schema
     */
    source_file_date?: string,
    
    
    /**
     * size in bytes of the source of the schema
     */
    source_file_size?: string,
    
    
    /**
     * date and time that the schema was loaded/generated
     */
    generation_date?: string,
    
    
    /**
     * if true then induced/mangled slot names are not created for class_usage and attributes
     */
    slot_names_unique?: string,
    
    
    /**
     * A collection of global variable settings
     */
    settings?: {[index: SettingSettingKey]: Setting },
    
    
    /**
     * the unique name of the element within the context of the schema.  Name is combined with the default prefix to form the globally unique subject of the target class.
     */
    name?: string,
    
    
    /**
     * the identifier of this class or slot must begin with the URIs referenced by this prefix
     */
    id_prefixes?: string,
    
    
    /**
     * the "native" URI of the element
     */
    definition_uri?: string,
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    local_names?: {[index: LocalNameLocalNameSource]: LocalName },
    
    
    /**
     * An established standard to which the element conforms.
     */
    conforms_to?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have comparable meaning. These may include terms that are precisely equivalent, broader or narrower in meaning, or otherwise semantically related but not equivalent from a strict ontological perspective.
     */
    mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have identical meaning.
     */
    exact_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have close meaning.
     */
    close_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have related meaning.
     */
    related_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have narrower meaning.
     */
    narrow_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have broader meaning.
     */
    broad_mappings?: string,
    
    
    /**
     * the relative order in which the element occurs, lower values are given precedence
     */
    rank?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * None
 */

export interface TypeExpression  extends Expression  {
    
    
    /**
     * the string value of the slot must conform to this regular expression expressed in the string
     */
    pattern?: string,
    
    
    /**
     * the string value of the slot must conform to the regular expression in the pattern expression
     */
    structured_pattern?: PatternExpression,
    
    
    /**
     * the slot must have range string and the value of the slot must equal the specified value
     */
    equals_string?: string,
    
    
    /**
     * the slot must have range string and the value of the slot must equal one of the specified values
     */
    equals_string_in?: string,
    
    
    /**
     * the slot must have range of a number and the value of the slot must equal the specified value
     */
    equals_number?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or higher than this
     */
    minimum_value?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or lowe than this
     */
    maximum_value?: string,
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: AnonymousTypeExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: AnonymousTypeExpression[],
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: AnonymousTypeExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: AnonymousTypeExpression[],
    
}


/**
 * None
 */

export interface AnonymousTypeExpression  extends TypeExpression  {
    
    
    /**
     * the string value of the slot must conform to this regular expression expressed in the string
     */
    pattern?: string,
    
    
    /**
     * the string value of the slot must conform to the regular expression in the pattern expression
     */
    structured_pattern?: PatternExpression,
    
    
    /**
     * the slot must have range string and the value of the slot must equal the specified value
     */
    equals_string?: string,
    
    
    /**
     * the slot must have range string and the value of the slot must equal one of the specified values
     */
    equals_string_in?: string,
    
    
    /**
     * the slot must have range of a number and the value of the slot must equal the specified value
     */
    equals_number?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or higher than this
     */
    minimum_value?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or lowe than this
     */
    maximum_value?: string,
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: AnonymousTypeExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: AnonymousTypeExpression[],
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: AnonymousTypeExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: AnonymousTypeExpression[],
    
}


/**
 * A data type definition.
 */

export interface TypeDefinition  extends Element, TypeExpression  {
    
    
    /**
     * Names a parent type
     */
    typeof?: TypeDefinitionName,
    
    
    /**
     * python base type that implements this type definition
     */
    base?: string,
    
    
    /**
     * The uri that defines the possible values for the type definition
     */
    uri?: string,
    
    
    /**
     * the name of the python object that implements this type definition
     */
    repr?: string,
    
    
    /**
     * the string value of the slot must conform to this regular expression expressed in the string
     */
    pattern?: string,
    
    
    /**
     * the string value of the slot must conform to the regular expression in the pattern expression
     */
    structured_pattern?: PatternExpression,
    
    
    /**
     * the slot must have range string and the value of the slot must equal the specified value
     */
    equals_string?: string,
    
    
    /**
     * the slot must have range string and the value of the slot must equal one of the specified values
     */
    equals_string_in?: string,
    
    
    /**
     * the slot must have range of a number and the value of the slot must equal the specified value
     */
    equals_number?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or higher than this
     */
    minimum_value?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or lowe than this
     */
    maximum_value?: string,
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: AnonymousTypeExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: AnonymousTypeExpression[],
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: AnonymousTypeExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: AnonymousTypeExpression[],
    
    
    /**
     * the unique name of the element within the context of the schema.  Name is combined with the default prefix to form the globally unique subject of the target class.
     */
    name?: string,
    
    
    /**
     * the identifier of this class or slot must begin with the URIs referenced by this prefix
     */
    id_prefixes?: string,
    
    
    /**
     * the "native" URI of the element
     */
    definition_uri?: string,
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    local_names?: {[index: LocalNameLocalNameSource]: LocalName },
    
    
    /**
     * An established standard to which the element conforms.
     */
    conforms_to?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have comparable meaning. These may include terms that are precisely equivalent, broader or narrower in meaning, or otherwise semantically related but not equivalent from a strict ontological perspective.
     */
    mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have identical meaning.
     */
    exact_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have close meaning.
     */
    close_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have related meaning.
     */
    related_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have narrower meaning.
     */
    narrow_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have broader meaning.
     */
    broad_mappings?: string,
    
    
    /**
     * the relative order in which the element occurs, lower values are given precedence
     */
    rank?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * the name and description of a subset
 */

export interface SubsetDefinition  extends Element  {
    
    
    /**
     * the unique name of the element within the context of the schema.  Name is combined with the default prefix to form the globally unique subject of the target class.
     */
    name?: string,
    
    
    /**
     * the identifier of this class or slot must begin with the URIs referenced by this prefix
     */
    id_prefixes?: string,
    
    
    /**
     * the "native" URI of the element
     */
    definition_uri?: string,
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    local_names?: {[index: LocalNameLocalNameSource]: LocalName },
    
    
    /**
     * An established standard to which the element conforms.
     */
    conforms_to?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have comparable meaning. These may include terms that are precisely equivalent, broader or narrower in meaning, or otherwise semantically related but not equivalent from a strict ontological perspective.
     */
    mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have identical meaning.
     */
    exact_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have close meaning.
     */
    close_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have related meaning.
     */
    related_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have narrower meaning.
     */
    narrow_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have broader meaning.
     */
    broad_mappings?: string,
    
    
    /**
     * the relative order in which the element occurs, lower values are given precedence
     */
    rank?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * base class for definitions
 */

export interface Definition  extends Element  {
    
    
    /**
     * specifies single-inheritance between classes or slots. While multiple inheritance is not allowed, mixins can be provided effectively providing the same thing. The semantics are the same when translated to formalisms that allow MI (e.g. RDFS/OWL). When translating to a SI framework (e.g. java classes, python classes) then is a is used. When translating a framework without polymorphism (e.g. json-schema, solr document schema) then is a and mixins are recursively unfolded
     */
    is_a?: DefinitionName,
    
    
    /**
     * an abstract class is a high level class or slot that is typically used to group common slots together and cannot be directly instantiated.
     */
    abstract?: string,
    
    
    /**
     * this slot or class can only be used as a mixin.
     */
    mixin?: string,
    
    
    /**
     * List of definitions to be mixed in. Targets may be any definition of the same type
     */
    mixins?: DefinitionName[],
    
    
    /**
     * Used to extend class or slot definitions. For example, if we have a core schema where a gene has two slots for identifier and symbol, and we have a specialized schema for my_organism where we wish to add a slot systematic_name, we can avoid subclassing by defining a class gene_my_organism, adding the slot to this class, and then adding an apply_to pointing to the gene class. The new slot will be 'injected into' the gene class.
     */
    apply_to?: DefinitionName[],
    
    
    /**
     * the identifier of a "value set" -- a set of identifiers that form the possible values for the range of a slot
     */
    values_from?: string,
    
    
    /**
     * agent that created the element
     */
    created_by?: string,
    
    
    /**
     * time at which the element was created
     */
    created_on?: string,
    
    
    /**
     * time at which the element was last updated
     */
    last_updated_on?: string,
    
    
    /**
     * agent that modified the element
     */
    modified_by?: string,
    
    
    /**
     * status of the element
     */
    status?: string,
    
    
    /**
     * Used on a slot that stores the string serialization of the containing object. The syntax follows python formatted strings, with slot names enclosed in {}s. These are expanded using the values of those slots.
We call the slot with the serialization the s-slot, the slots used in the {}s are v-slots. If both s-slots and v-slots are populated on an object then the value of the s-slot should correspond to the expansion.
Implementations of frameworks may choose to use this property to either (a) PARSE: implement automated normalizations by parsing denormalized strings into complex objects (b) GENERARE: implement automated to_string labeling of complex objects
For example, a Measurement class may have 3 fields: unit, value, and string_value. The string_value slot may have a string_serialization of {value}{unit} such that if unit=cm and value=2, the value of string_value shouldd be 2cm
     */
    string_serialization?: string,
    
    
    /**
     * the unique name of the element within the context of the schema.  Name is combined with the default prefix to form the globally unique subject of the target class.
     */
    name?: string,
    
    
    /**
     * the identifier of this class or slot must begin with the URIs referenced by this prefix
     */
    id_prefixes?: string,
    
    
    /**
     * the "native" URI of the element
     */
    definition_uri?: string,
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    local_names?: {[index: LocalNameLocalNameSource]: LocalName },
    
    
    /**
     * An established standard to which the element conforms.
     */
    conforms_to?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have comparable meaning. These may include terms that are precisely equivalent, broader or narrower in meaning, or otherwise semantically related but not equivalent from a strict ontological perspective.
     */
    mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have identical meaning.
     */
    exact_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have close meaning.
     */
    close_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have related meaning.
     */
    related_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have narrower meaning.
     */
    narrow_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have broader meaning.
     */
    broad_mappings?: string,
    
    
    /**
     * the relative order in which the element occurs, lower values are given precedence
     */
    rank?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * List of values that constrain the range of a slot
 */

export interface EnumDefinition  extends Element  {
    
    
    /**
     * the identifier of an enumeration code set.
     */
    code_set?: string,
    
    
    /**
     * the version tag of the enumeration code set
     */
    code_set_tag?: string,
    
    
    /**
     * the version identifier of the enumeration code set
     */
    code_set_version?: string,
    
    
    /**
     * Defines the specific formula to be used to generate the permissible values.
     */
    pv_formula?: string,
    
    
    /**
     * A list of possible values for a slot range
     */
    permissible_values?: {[index: PermissibleValueText]: PermissibleValue },
    
    
    /**
     * the unique name of the element within the context of the schema.  Name is combined with the default prefix to form the globally unique subject of the target class.
     */
    name?: string,
    
    
    /**
     * the identifier of this class or slot must begin with the URIs referenced by this prefix
     */
    id_prefixes?: string,
    
    
    /**
     * the "native" URI of the element
     */
    definition_uri?: string,
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    local_names?: {[index: LocalNameLocalNameSource]: LocalName },
    
    
    /**
     * An established standard to which the element conforms.
     */
    conforms_to?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have comparable meaning. These may include terms that are precisely equivalent, broader or narrower in meaning, or otherwise semantically related but not equivalent from a strict ontological perspective.
     */
    mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have identical meaning.
     */
    exact_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have close meaning.
     */
    close_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have related meaning.
     */
    related_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have narrower meaning.
     */
    narrow_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have broader meaning.
     */
    broad_mappings?: string,
    
    
    /**
     * the relative order in which the element occurs, lower values are given precedence
     */
    rank?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * general mixin for any class that can represent some form of expression
 */

export interface Expression  {
    
}


/**
 * None
 */

export interface AnonymousExpression  extends Expression, Extensible, Annotatable, CommonMetadata  {
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * An expression that describes an abstract path from an object to another through a sequence of slot lookups
 */

export interface PathExpression  extends Expression, Extensible, Annotatable, CommonMetadata  {
    
    
    /**
     * in a sequential list, this indicates the next member
     */
    followed_by?: PathExpression,
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: PathExpression[],
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: PathExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: PathExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: PathExpression[],
    
    
    /**
     * true if the slot is to be inversed
     */
    reversed?: string,
    
    
    /**
     * the slot to traverse
     */
    traverse?: SlotDefinitionName,
    
    
    /**
     * A range that is described as a boolean expression combining existing ranges
     */
    range_expression?: AnonymousClassExpression,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * an expression that constrains the range of values a slot can take
 */

export interface SlotExpression  extends Expression  {
    
    
    /**
     * defines the type of the object of the slot.  Given the following slot definition
  S1:
    domain: C1
    range:  C2
the declaration
  X:
    S1: Y

implicitly asserts Y is an instance of C2

     */
    range?: ElementName,
    
    
    /**
     * A range that is described as a boolean expression combining existing ranges
     */
    range_expression?: AnonymousClassExpression,
    
    
    /**
     * true means that the slot must be present in the loaded definition
     */
    required?: string,
    
    
    /**
     * true means that the slot should be present in the loaded definition, but this is not required
     */
    recommended?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or higher than this
     */
    minimum_value?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or lowe than this
     */
    maximum_value?: string,
    
    
    /**
     * the string value of the slot must conform to this regular expression expressed in the string
     */
    pattern?: string,
    
    
    /**
     * the string value of the slot must conform to the regular expression in the pattern expression
     */
    structured_pattern?: PatternExpression,
    
    
    /**
     * the slot must have range string and the value of the slot must equal the specified value
     */
    equals_string?: string,
    
    
    /**
     * the slot must have range string and the value of the slot must equal one of the specified values
     */
    equals_string_in?: string,
    
    
    /**
     * the slot must have range of a number and the value of the slot must equal the specified value
     */
    equals_number?: string,
    
    
    /**
     * the value of the slot must equal the value of the evaluated expression
     */
    equals_expression?: string,
    
    
    /**
     * the minimum number of entries for a multivalued slot
     */
    minimum_cardinality?: string,
    
    
    /**
     * the maximum number of entries for a multivalued slot
     */
    maximum_cardinality?: string,
    
    
    /**
     * the values of the slot is multivalued with at least one member satisfying the condition
     */
    has_member?: AnonymousSlotExpression,
    
    
    /**
     * the value of the multiavlued slot is a list where all elements conform to the specified values.
this defines a dynamic class with named slots according to matching constraints

E.g to state that all members of a list are between 1 and 10
```
all_members:
  x:
    range: integer
    minimum_value: 10
    maximum_value: 10
```
     */
    all_members?: {[index: SlotDefinitionName]: SlotDefinition },
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: AnonymousSlotExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: AnonymousSlotExpression[],
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: AnonymousSlotExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: AnonymousSlotExpression[],
    
}


/**
 * None
 */

export interface AnonymousSlotExpression  extends AnonymousExpression, SlotExpression  {
    
    
    /**
     * defines the type of the object of the slot.  Given the following slot definition
  S1:
    domain: C1
    range:  C2
the declaration
  X:
    S1: Y

implicitly asserts Y is an instance of C2

     */
    range?: ElementName,
    
    
    /**
     * A range that is described as a boolean expression combining existing ranges
     */
    range_expression?: AnonymousClassExpression,
    
    
    /**
     * true means that the slot must be present in the loaded definition
     */
    required?: string,
    
    
    /**
     * true means that the slot should be present in the loaded definition, but this is not required
     */
    recommended?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or higher than this
     */
    minimum_value?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or lowe than this
     */
    maximum_value?: string,
    
    
    /**
     * the string value of the slot must conform to this regular expression expressed in the string
     */
    pattern?: string,
    
    
    /**
     * the string value of the slot must conform to the regular expression in the pattern expression
     */
    structured_pattern?: PatternExpression,
    
    
    /**
     * the slot must have range string and the value of the slot must equal the specified value
     */
    equals_string?: string,
    
    
    /**
     * the slot must have range string and the value of the slot must equal one of the specified values
     */
    equals_string_in?: string,
    
    
    /**
     * the slot must have range of a number and the value of the slot must equal the specified value
     */
    equals_number?: string,
    
    
    /**
     * the value of the slot must equal the value of the evaluated expression
     */
    equals_expression?: string,
    
    
    /**
     * the minimum number of entries for a multivalued slot
     */
    minimum_cardinality?: string,
    
    
    /**
     * the maximum number of entries for a multivalued slot
     */
    maximum_cardinality?: string,
    
    
    /**
     * the values of the slot is multivalued with at least one member satisfying the condition
     */
    has_member?: AnonymousSlotExpression,
    
    
    /**
     * the value of the multiavlued slot is a list where all elements conform to the specified values.
this defines a dynamic class with named slots according to matching constraints

E.g to state that all members of a list are between 1 and 10
```
all_members:
  x:
    range: integer
    minimum_value: 10
    maximum_value: 10
```
     */
    all_members?: {[index: SlotDefinitionName]: SlotDefinition },
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: AnonymousSlotExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: AnonymousSlotExpression[],
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: AnonymousSlotExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: AnonymousSlotExpression[],
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * the definition of a property or a slot
 */

export interface SlotDefinition  extends Definition, SlotExpression  {
    
    
    /**
     * a name that is used in the singular form
     */
    singular_name?: string,
    
    
    /**
     * defines the type of the subject of the slot.  Given the following slot definition
  S1:
    domain: C1
    range:  C2
the declaration
  X:
    S1: Y

implicitly asserts that X is an instance of C1

     */
    domain?: ClassDefinitionName,
    
    
    /**
     * predicate of this slot for semantic web application
     */
    slot_uri?: string,
    
    
    /**
     * true means that slot can have more than one value
     */
    multivalued?: string,
    
    
    /**
     * true means that the *value* of a slot is inherited by subclasses
     */
    inherited?: string,
    
    
    /**
     * If present, slot is read only.  Text explains why
     */
    readonly?: string,
    
    
    /**
     * function that provides a default value for the slot.  Possible values for this slot are defined in
linkml.utils.ifabsent_functions.default_library:
  * [Tt]rue -- boolean True
  * [Ff]alse -- boolean False
  * int(value) -- integer value
  * str(value) -- string value
  * default_range -- schema default range
  * bnode -- blank node identifier
  * slot_uri -- URI for the slot
  * class_curie -- CURIE for the containing class
  * class_uri -- URI for the containing class
     */
    ifabsent?: string,
    
    
    /**
     * True means that keyed or identified slot appears in an outer structure by value.  False means that only the key or identifier for the slot appears within the domain, referencing a structure that appears elsewhere.
     */
    inlined?: string,
    
    
    /**
     * True means that an inlined slot is represented as a list of range instances.  False means that an inlined slot is represented as a dictionary, whose key is the slot key or identifier and whose value is the range instance.
     */
    inlined_as_list?: string,
    
    
    /**
     * True means that the key slot(s) uniquely identify the container.
     */
    key?: string,
    
    
    /**
     * True means that the key slot(s) uniquely identify the container. There can be at most one identifier or key per container
     */
    identifier?: string,
    
    
    /**
     * True means that the key slot(s) is used to determine the instantiation (types) relation between objects and a ClassDefinition
     */
    designates_type?: string,
    
    
    /**
     * the name used for a slot in the context of its owning class.  If present, this is used instead of the actual slot name.
     */
    alias?: string,
    
    
    /**
     * the "owner" of the slot. It is the class if it appears in the slots list, otherwise the declaring slot
     */
    owner?: DefinitionName,
    
    
    /**
     * the class(es) that reference the slot in a "slots" or "slot_usage" context
     */
    domain_of?: ClassDefinitionName[],
    
    
    /**
     * Ontology property which this slot is a subproperty of
     */
    subproperty_of?: SlotDefinitionName,
    
    
    /**
     * If s is symmetric, and i.s=v, then v.s=i
     */
    symmetric?: string,
    
    
    /**
     * If s is reflexive, then i.s=i for all instances i
     */
    reflexive?: string,
    
    
    /**
     * If s is locally_reflexive, then i.s=i for all instances i where s if a class slot for the type of i
     */
    locally_reflexive?: string,
    
    
    /**
     * If s is irreflexive, then there exists no i such i.s=i
     */
    irreflexive?: string,
    
    
    /**
     * If s is antisymmetric, and i.s=v where i is different from v, v.s cannot have value i
     */
    asymmetric?: string,
    
    
    /**
     * If s is transitive, and i.s=z, and s.s=j, then i.s=j
     */
    transitive?: string,
    
    
    /**
     * indicates that any instance of d s r implies that there is also an instance of r s' d
     */
    inverse?: SlotDefinitionName,
    
    
    /**
     * indicates that any instance, i,  the domain of this slot will include an assert of i s range
     */
    is_class_field?: string,
    
    
    /**
     * If s transitive_form_of d, then (1) s holds whenever d holds (2) s is transitive (3) d holds whenever s holds and there are no intermediates, and s is not reflexive
     */
    transitive_form_of?: SlotDefinitionName,
    
    
    /**
     * transitive_form_of including the reflexive case
     */
    reflexive_transitive_form_of?: SlotDefinitionName,
    
    
    /**
     * the role played by the slot range
     */
    role?: string,
    
    
    /**
     * True means that this slot was defined in a slot_usage situation
     */
    is_usage_slot?: string,
    
    
    /**
     * The name of the slot referenced in the slot_usage
     */
    usage_slot_name?: string,
    
    
    /**
     * the role a slot on a relationship class plays, for example, the subject, object or predicate roles
     */
    relational_role?: string,
    
    
    /**
     * allows for grouping of related slots into a grouping slot that serves the role of a group
     */
    slot_group?: SlotDefinitionName,
    
    
    /**
     * true if this slot is a grouping slot
     */
    is_grouping_slot?: string,
    
    
    /**
     * a rule for inferring a slot assignment based on evaluating a path through a sequence of slot assignemnts
     */
    path_rule?: PathExpression,
    
    
    /**
     * Two classes are disjoint if they have no instances in common, two slots are disjoint if they can never hold between the same two instances
     */
    disjoint_with?: SlotDefinitionName[],
    
    
    /**
     * If true then all direct is_a children are mutually disjoint and share no instances in common
     */
    children_are_mutually_disjoint?: string,
    
    
    /**
     * defines the type of the object of the slot.  Given the following slot definition
  S1:
    domain: C1
    range:  C2
the declaration
  X:
    S1: Y

implicitly asserts Y is an instance of C2

     */
    range?: ElementName,
    
    
    /**
     * A range that is described as a boolean expression combining existing ranges
     */
    range_expression?: AnonymousClassExpression,
    
    
    /**
     * true means that the slot must be present in the loaded definition
     */
    required?: string,
    
    
    /**
     * true means that the slot should be present in the loaded definition, but this is not required
     */
    recommended?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or higher than this
     */
    minimum_value?: string,
    
    
    /**
     * for slots with ranges of type number, the value must be equal to or lowe than this
     */
    maximum_value?: string,
    
    
    /**
     * the string value of the slot must conform to this regular expression expressed in the string
     */
    pattern?: string,
    
    
    /**
     * the string value of the slot must conform to the regular expression in the pattern expression
     */
    structured_pattern?: PatternExpression,
    
    
    /**
     * the slot must have range string and the value of the slot must equal the specified value
     */
    equals_string?: string,
    
    
    /**
     * the slot must have range string and the value of the slot must equal one of the specified values
     */
    equals_string_in?: string,
    
    
    /**
     * the slot must have range of a number and the value of the slot must equal the specified value
     */
    equals_number?: string,
    
    
    /**
     * the value of the slot must equal the value of the evaluated expression
     */
    equals_expression?: string,
    
    
    /**
     * the minimum number of entries for a multivalued slot
     */
    minimum_cardinality?: string,
    
    
    /**
     * the maximum number of entries for a multivalued slot
     */
    maximum_cardinality?: string,
    
    
    /**
     * the values of the slot is multivalued with at least one member satisfying the condition
     */
    has_member?: AnonymousSlotExpression,
    
    
    /**
     * the value of the multiavlued slot is a list where all elements conform to the specified values.
this defines a dynamic class with named slots according to matching constraints

E.g to state that all members of a list are between 1 and 10
```
all_members:
  x:
    range: integer
    minimum_value: 10
    maximum_value: 10
```
     */
    all_members?: {[index: SlotDefinitionName]: SlotDefinition },
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: AnonymousSlotExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: AnonymousSlotExpression[],
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: AnonymousSlotExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: AnonymousSlotExpression[],
    
    
    /**
     * specifies single-inheritance between classes or slots. While multiple inheritance is not allowed, mixins can be provided effectively providing the same thing. The semantics are the same when translated to formalisms that allow MI (e.g. RDFS/OWL). When translating to a SI framework (e.g. java classes, python classes) then is a is used. When translating a framework without polymorphism (e.g. json-schema, solr document schema) then is a and mixins are recursively unfolded
     */
    is_a?: SlotDefinitionName,
    
    
    /**
     * an abstract class is a high level class or slot that is typically used to group common slots together and cannot be directly instantiated.
     */
    abstract?: string,
    
    
    /**
     * this slot or class can only be used as a mixin.
     */
    mixin?: string,
    
    
    /**
     * List of definitions to be mixed in. Targets may be any definition of the same type
     */
    mixins?: SlotDefinitionName[],
    
    
    /**
     * Used to extend class or slot definitions. For example, if we have a core schema where a gene has two slots for identifier and symbol, and we have a specialized schema for my_organism where we wish to add a slot systematic_name, we can avoid subclassing by defining a class gene_my_organism, adding the slot to this class, and then adding an apply_to pointing to the gene class. The new slot will be 'injected into' the gene class.
     */
    apply_to?: SlotDefinitionName[],
    
    
    /**
     * the identifier of a "value set" -- a set of identifiers that form the possible values for the range of a slot
     */
    values_from?: string,
    
    
    /**
     * agent that created the element
     */
    created_by?: string,
    
    
    /**
     * time at which the element was created
     */
    created_on?: string,
    
    
    /**
     * time at which the element was last updated
     */
    last_updated_on?: string,
    
    
    /**
     * agent that modified the element
     */
    modified_by?: string,
    
    
    /**
     * status of the element
     */
    status?: string,
    
    
    /**
     * Used on a slot that stores the string serialization of the containing object. The syntax follows python formatted strings, with slot names enclosed in {}s. These are expanded using the values of those slots.
We call the slot with the serialization the s-slot, the slots used in the {}s are v-slots. If both s-slots and v-slots are populated on an object then the value of the s-slot should correspond to the expansion.
Implementations of frameworks may choose to use this property to either (a) PARSE: implement automated normalizations by parsing denormalized strings into complex objects (b) GENERARE: implement automated to_string labeling of complex objects
For example, a Measurement class may have 3 fields: unit, value, and string_value. The string_value slot may have a string_serialization of {value}{unit} such that if unit=cm and value=2, the value of string_value shouldd be 2cm
     */
    string_serialization?: string,
    
    
    /**
     * the unique name of the element within the context of the schema.  Name is combined with the default prefix to form the globally unique subject of the target class.
     */
    name?: string,
    
    
    /**
     * the identifier of this class or slot must begin with the URIs referenced by this prefix
     */
    id_prefixes?: string,
    
    
    /**
     * the "native" URI of the element
     */
    definition_uri?: string,
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    local_names?: {[index: LocalNameLocalNameSource]: LocalName },
    
    
    /**
     * An established standard to which the element conforms.
     */
    conforms_to?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have comparable meaning. These may include terms that are precisely equivalent, broader or narrower in meaning, or otherwise semantically related but not equivalent from a strict ontological perspective.
     */
    mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have identical meaning.
     */
    exact_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have close meaning.
     */
    close_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have related meaning.
     */
    related_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have narrower meaning.
     */
    narrow_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have broader meaning.
     */
    broad_mappings?: string,
    
    
    /**
     * the relative order in which the element occurs, lower values are given precedence
     */
    rank?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * A boolean expression that can be used to dynamically determine membership of a class
 */

export interface ClassExpression  {
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: AnonymousClassExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: AnonymousClassExpression[],
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: AnonymousClassExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: AnonymousClassExpression[],
    
    
    /**
     * the redefinition of a slot in the context of the containing class definition.
     */
    slot_conditions?: {[index: SlotDefinitionName]: SlotDefinition },
    
}


/**
 * None
 */

export interface AnonymousClassExpression  extends AnonymousExpression, ClassExpression  {
    
    
    /**
     * specifies single-inheritance between classes or slots. While multiple inheritance is not allowed, mixins can be provided effectively providing the same thing. The semantics are the same when translated to formalisms that allow MI (e.g. RDFS/OWL). When translating to a SI framework (e.g. java classes, python classes) then is a is used. When translating a framework without polymorphism (e.g. json-schema, solr document schema) then is a and mixins are recursively unfolded
     */
    is_a?: DefinitionName,
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: AnonymousClassExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: AnonymousClassExpression[],
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: AnonymousClassExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: AnonymousClassExpression[],
    
    
    /**
     * the redefinition of a slot in the context of the containing class definition.
     */
    slot_conditions?: {[index: SlotDefinitionName]: SlotDefinition },
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * the definition of a class or interface
 */

export interface ClassDefinition  extends Definition, ClassExpression  {
    
    
    /**
     * list of slot names that are applicable to a class
     */
    slots?: SlotDefinitionName[],
    
    
    /**
     * the redefinition of a slot in the context of the containing class definition.
     */
    slot_usage?: {[index: SlotDefinitionName]: SlotDefinition },
    
    
    /**
     * Inline definition of slots
     */
    attributes?: {[index: SlotDefinitionName]: SlotDefinition },
    
    
    /**
     * URI of the class in an RDF environment
     */
    class_uri?: string,
    
    
    /**
     * rdfs:subClassOf to be emitted in OWL generation
     */
    subclass_of?: string,
    
    
    /**
     * indicates that the domain class consists exactly of the members of the classes in the range
     */
    union_of?: ClassDefinitionName[],
    
    
    /**
     * The combination of is a plus defining slots form a genus-differentia definition, or the set of necessary and sufficient conditions that can be transformed into an OWL equivalence axiom
     */
    defining_slots?: SlotDefinitionName[],
    
    
    /**
     * indicator that this is the root class in tree structures
     */
    tree_root?: string,
    
    
    /**
     * Set of unique keys for this slot
     */
    unique_keys?: {[index: UniqueKeyUniqueKeyName]: UniqueKey },
    
    
    /**
     * the collection of rules that apply to all members of this class
     */
    rules?: ClassRule[],
    
    
    /**
     * the collection of classification rules that apply to all members of this class
     */
    classification_rules?: AnonymousClassExpression[],
    
    
    /**
     * if true then induced/mangled slot names are not created for class_usage and attributes
     */
    slot_names_unique?: string,
    
    
    /**
     * true if this class represents a relationship rather than an entity
     */
    represents_relationship?: string,
    
    
    /**
     * Two classes are disjoint if they have no instances in common, two slots are disjoint if they can never hold between the same two instances
     */
    disjoint_with?: ClassDefinitionName[],
    
    
    /**
     * If true then all direct is_a children are mutually disjoint and share no instances in common
     */
    children_are_mutually_disjoint?: string,
    
    
    /**
     * holds if at least one of the expressions hold
     */
    any_of?: AnonymousClassExpression[],
    
    
    /**
     * holds if only one of the expressions hold
     */
    exactly_one_of?: AnonymousClassExpression[],
    
    
    /**
     * holds if none of the expressions hold
     */
    none_of?: AnonymousClassExpression[],
    
    
    /**
     * holds if all of the expressions hold
     */
    all_of?: AnonymousClassExpression[],
    
    
    /**
     * the redefinition of a slot in the context of the containing class definition.
     */
    slot_conditions?: {[index: SlotDefinitionName]: SlotDefinition },
    
    
    /**
     * specifies single-inheritance between classes or slots. While multiple inheritance is not allowed, mixins can be provided effectively providing the same thing. The semantics are the same when translated to formalisms that allow MI (e.g. RDFS/OWL). When translating to a SI framework (e.g. java classes, python classes) then is a is used. When translating a framework without polymorphism (e.g. json-schema, solr document schema) then is a and mixins are recursively unfolded
     */
    is_a?: ClassDefinitionName,
    
    
    /**
     * an abstract class is a high level class or slot that is typically used to group common slots together and cannot be directly instantiated.
     */
    abstract?: string,
    
    
    /**
     * this slot or class can only be used as a mixin.
     */
    mixin?: string,
    
    
    /**
     * List of definitions to be mixed in. Targets may be any definition of the same type
     */
    mixins?: ClassDefinitionName[],
    
    
    /**
     * Used to extend class or slot definitions. For example, if we have a core schema where a gene has two slots for identifier and symbol, and we have a specialized schema for my_organism where we wish to add a slot systematic_name, we can avoid subclassing by defining a class gene_my_organism, adding the slot to this class, and then adding an apply_to pointing to the gene class. The new slot will be 'injected into' the gene class.
     */
    apply_to?: ClassDefinitionName[],
    
    
    /**
     * the identifier of a "value set" -- a set of identifiers that form the possible values for the range of a slot
     */
    values_from?: string,
    
    
    /**
     * agent that created the element
     */
    created_by?: string,
    
    
    /**
     * time at which the element was created
     */
    created_on?: string,
    
    
    /**
     * time at which the element was last updated
     */
    last_updated_on?: string,
    
    
    /**
     * agent that modified the element
     */
    modified_by?: string,
    
    
    /**
     * status of the element
     */
    status?: string,
    
    
    /**
     * Used on a slot that stores the string serialization of the containing object. The syntax follows python formatted strings, with slot names enclosed in {}s. These are expanded using the values of those slots.
We call the slot with the serialization the s-slot, the slots used in the {}s are v-slots. If both s-slots and v-slots are populated on an object then the value of the s-slot should correspond to the expansion.
Implementations of frameworks may choose to use this property to either (a) PARSE: implement automated normalizations by parsing denormalized strings into complex objects (b) GENERARE: implement automated to_string labeling of complex objects
For example, a Measurement class may have 3 fields: unit, value, and string_value. The string_value slot may have a string_serialization of {value}{unit} such that if unit=cm and value=2, the value of string_value shouldd be 2cm
     */
    string_serialization?: string,
    
    
    /**
     * the unique name of the element within the context of the schema.  Name is combined with the default prefix to form the globally unique subject of the target class.
     */
    name?: string,
    
    
    /**
     * the identifier of this class or slot must begin with the URIs referenced by this prefix
     */
    id_prefixes?: string,
    
    
    /**
     * the "native" URI of the element
     */
    definition_uri?: string,
    
    
    /**
     * None
     */
    aliases?: string,
    
    
    /**
     * None
     */
    local_names?: {[index: LocalNameLocalNameSource]: LocalName },
    
    
    /**
     * An established standard to which the element conforms.
     */
    conforms_to?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have comparable meaning. These may include terms that are precisely equivalent, broader or narrower in meaning, or otherwise semantically related but not equivalent from a strict ontological perspective.
     */
    mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have identical meaning.
     */
    exact_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have close meaning.
     */
    close_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have related meaning.
     */
    related_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have narrower meaning.
     */
    narrow_mappings?: string,
    
    
    /**
     * A list of terms from different schemas or terminology systems that have broader meaning.
     */
    broad_mappings?: string,
    
    
    /**
     * the relative order in which the element occurs, lower values are given precedence
     */
    rank?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * A rule that is applied to classes
 */

export interface ClassLevelRule  {
    
}


/**
 * A rule that applies to instances of a class
 */

export interface ClassRule  extends ClassLevelRule, Extensible, Annotatable, CommonMetadata  {
    
    
    /**
     * an expression that must hold in order for the rule to be applicable to an instance
     */
    preconditions?: AnonymousClassExpression,
    
    
    /**
     * an expression that must hold for an instance of the class, if the preconditions hold
     */
    postconditions?: AnonymousClassExpression,
    
    
    /**
     * an expression that must hold for an instance of the class, if the preconditions no not hold
     */
    elseconditions?: AnonymousClassExpression,
    
    
    /**
     * in addition to preconditions entailing postconditions, the postconditions entail the preconditions
     */
    bidirectional?: string,
    
    
    /**
     * if true, the the postconditions may be omitted in instance data, but it is valid for an inference engine to add these
     */
    open_world?: string,
    
    
    /**
     * the relative order in which the element occurs, lower values are given precedence
     */
    rank?: string,
    
    
    /**
     * a deactivated rule is not executed by the rules engine
     */
    deactivated?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * a regular expression pattern used to evaluate conformance of a string
 */

export interface PatternExpression  extends Extensible, Annotatable, CommonMetadata  {
    
    
    /**
     * the string value of the slot must conform to this regular expression expressed in the string. May be interpolated.
     */
    syntax?: string,
    
    
    /**
     * if true then the pattern is first string interpolated
     */
    interpolated?: string,
    
    
    /**
     * if true then the pattern must match the whole string, as if enclosed in ^...$
     */
    partial_match?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * assignment of a key to a value
 */

export interface Setting  {
    
    
    /**
     * the variable name for a setting
     */
    setting_key?: string,
    
    
    /**
     * The value assigned for a setting
     */
    setting_value?: string,
    
}


/**
 * prefix URI tuple
 */

export interface Prefix  {
    
    
    /**
     * the nsname (sans ':' for a given prefix)
     */
    prefix_prefix?: string,
    
    
    /**
     * A URI associated with a given prefix
     */
    prefix_reference?: string,
    
}


/**
 * an attributed label
 */

export interface LocalName  {
    
    
    /**
     * the ncname of the source of the name
     */
    local_name_source?: string,
    
    
    /**
     * a name assigned to an element in a given ontology
     */
    local_name_value?: string,
    
}


/**
 * usage example and description
 */

export interface Example  {
    
    
    /**
     * example value
     */
    value?: string,
    
    
    /**
     * description of what the value is doing
     */
    description?: string,
    
}


/**
 * an attributed description
 */

export interface AltDescription  {
    
    
    /**
     * the source of an attributed description
     */
    source?: string,
    
    
    /**
     * text of an attributed description
     */
    description?: string,
    
}


/**
 * a permissible value, accompanied by intended text and an optional mapping to a concept URI
 */

export interface PermissibleValue  extends Extensible, Annotatable, CommonMetadata  {
    
    
    /**
     * None
     */
    text?: string,
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * the value meaning (in the 11179 sense) of a permissible value
     */
    meaning?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * a collection of slots whose values uniquely identify an instance of a class
 */

export interface UniqueKey  extends Extensible, Annotatable, CommonMetadata  {
    
    
    /**
     * name of the unique key
     */
    unique_key_name?: string,
    
    
    /**
     * list of slot names that form a key
     */
    unique_key_slots?: SlotDefinitionName[],
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a description of the element's purpose and use
     */
    description?: string,
    
    
    /**
     * None
     */
    alt_descriptions?: {[index: AltDescriptionAltDescriptionSource]: AltDescription },
    
    
    /**
     * the official title of the element
     */
    title?: string,
    
    
    /**
     * Description of why and when this element will no longer be used
     */
    deprecated?: string,
    
    
    /**
     * Outstanding issue that needs resolution
     */
    todos?: string,
    
    
    /**
     * editorial notes about an element intended for internal consumption
     */
    notes?: string,
    
    
    /**
     * notes and comments about an element intended for external consumption
     */
    comments?: string,
    
    
    /**
     * example usages of an element
     */
    examples?: Example[],
    
    
    /**
     * used to indicate membership of a term in a defined subset of terms used for a particular domain or application (e.g. the translator_minimal subset holding the minimal set of predicates used in a translator knowledge graph)
     */
    in_subset?: SubsetDefinitionName[],
    
    
    /**
     * id of the schema that defined the element
     */
    from_schema?: string,
    
    
    /**
     * the imports entry that this element was derived from.  Empty means primary source
     */
    imported_from?: string,
    
    
    /**
     * A related resource from which the element is derived.
     */
    source?: string,
    
    
    /**
     * a reference
     */
    see_also?: string,
    
    
    /**
     * When an element is deprecated, it can be automatically replaced by this uri or curie
     */
    deprecated_element_has_exact_replacement?: string,
    
    
    /**
     * When an element is deprecated, it can be potentially replaced by this uri or curie
     */
    deprecated_element_has_possible_replacement?: string,
    
}


/**
 * mixin for classes that support annotations
 */

export interface Annotatable  {
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
}


/**
 * a tag/value pair with the semantics of OWL Annotation
 */

export interface Annotation  extends Extension, Annotatable  {
    
    
    /**
     * a collection of tag/text tuples with the semantics of OWL Annotation
     */
    annotations?: {[index: AnnotationExtensionTag]: Annotation },
    
    
    /**
     * a tag associated with an extension
     */
    tag?: string,
    
    
    /**
     * the actual annotation
     */
    value?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
}


/**
 * a tag/value pair used to add non-model information to an entry
 */

export interface Extension  {
    
    
    /**
     * a tag associated with an extension
     */
    tag?: string,
    
    
    /**
     * the actual annotation
     */
    value?: string,
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
}


/**
 * mixin for classes that support extension
 */

export interface Extensible  {
    
    
    /**
     * a tag/text tuple attached to an arbitrary element
     */
    extensions?: {[index: ExtensionExtensionTag]: Extension },
    
}

