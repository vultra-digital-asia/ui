import 'package:freezed_annotation/freezed_annotation.dart';

part 'cart_model.freezed.dart';
part 'cart_model.g.dart';

/// Immutable domain model for Cart with Freezed code generation.
@freezed
class CartModel with _$CartModel {
  const factory CartModel({
    required String id,
    required String name,
    required String email,
    required String status,
    required double amount,
    DateTime? createdAt,
  }) = _CartModel;

  factory CartModel.fromJson(Map<String, dynamic> json) =>
      _$CartModelFromJson(json);
}
