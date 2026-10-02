import 'package:freezed_annotation/freezed_annotation.dart';

part 'catalog_model.freezed.dart';
part 'catalog_model.g.dart';

/// Immutable domain model for Catalog with Freezed code generation.
@freezed
class CatalogModel with _$CatalogModel {
  const factory CatalogModel({
    required String id,
    required String name,
    required String email,
    required String status,
    required double amount,
    DateTime? createdAt,
  }) = _CatalogModel;

  factory CatalogModel.fromJson(Map<String, dynamic> json) =>
      _$CatalogModelFromJson(json);
}
